use crate::models::{data_base::*, response_models::{Error, *}, request_models::*};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::form::Form;
use mysql::{prelude::Queryable, *};
use chrono::{Utc, Local};
use crate::middleware::ApiKey;



/* 
    ROUTES AND FUCTION 

    /item[get] (get_item): Retrieve the complet items

    /item/notlend[get] (get_item_not_lend): Return a Vec of items without lend.

    /item[post] (post_item): Create item.

*/

#[get("/item")]
pub fn get_item() -> Result<Json<Vec<Items>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("SELECT * FROM items");

    let items: Vec<Items> = conn.query_map(query, |(iditem, nombre, descripcion, imagen)|{
        Items{iditem, nombre, descripcion, imagen}
    }).expect("Ocurrio un error en la consulta de items");

    Ok(Json(items))
}

#[get("/item/notlend")]
pub fn get_item_not_lend() -> Result<Json<Vec<Items>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("SELECT i.* FROM items i LEFT JOIN prestamo p ON i.iditem = p.iditem WHERE p.idprestamo IS NULL OR p.estado = 1;");

    let items: Vec<Items> = conn.query_map(&query, |(iditem, nombre, descripcion, imagen)|{
        Items{iditem, nombre, descripcion, imagen}
    }).expect("Ocurrio un error en la consulta");

    Ok(Json(items))
}

#[get("/lend/history")]
pub fn get_history() -> Result<Json<Vec<History>>, Custom<Json<Error>>> {
    let mut conn = connect();

    let query = String::from("SELECT h.hora, h.fecha, u.idusuario, u.nombre AS nombre_user, u.imagen AS imagen_user, i.nombre AS nombre_item, i.imagen AS imagen_item, e.nombre AS nombre_student, e.apellido AS apellido_student, s.idsalon, s.programa, pr.nombre AS nombre_profesor FROM historial h JOIN prestamo p ON h.idprestamo = p.idprestamo JOIN usuario u ON p.idusuario = u.idusuario JOIN items i ON p.iditem = i.iditem JOIN estudiante e ON p.idestudiante = e.idestudiante JOIN salon s ON p.idsalon = s.idsalon JOIN profesor pr ON p.idprofesor = pr.idprofesor;");

    let history = conn.query_map(&query, |(fecha, hora, idusuario, nombre_user, imagen_user, nombre_item, imagen_item, nombre_student, apellido_student, idsalon, programa, nombre_profesor)|{
        History{fecha, hora, idusuario, nombre_user, imagen_user, nombre_item, imagen_item, nombre_student, apellido_student, idsalon, programa, nombre_profesor}
    }).expect("Ocurrio un error en la consulta");

    Ok(Json(history))
}


#[post("/item", data = "<item>")]
pub async fn post_item(mut item: Form<AddItem<'_>>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query_1 = format!("select * from items where iditem='{}'", item.iditem);

    let items: Vec<Items> = conn.query_map(&query_1, |(iditem, nombre, descripcion, imagen)|{
        Items{
            iditem, nombre, descripcion, imagen
        } 
    }).expect("Ocurrio un error"); 

    if items.len() >= 1{
        let error = Error{error: String::from("este item ya existe")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let path = format!("./upload/item/{}.png", item.iditem);

    item.file.copy_to(&path).await.expect("Error al guardar la imagen");

    let query_2 = String::from("INSERT INTO items(iditem, nombre, descripcion, imagen) VALUES (?, ?, ?, ?)");

    conn.exec_drop(&query_2,(&item.iditem, &item.nombre, &item.descripcion, format!("http://localhost:8000/upload/item/{}.png", item.iditem))).expect("Ocurrio un Error al guardar el archivo");

    let message = Message{
        message: String::from("Item creado") 
    };

    Ok(Json(message))
 }

#[post("/lend",format = "application/json" ,data = "<prestamo>")]
pub async fn post_lend(prestamo: Json<AddPrestamo>, token: ApiKey) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query_verifc_1 = format!("select * from items where iditem='{}'", prestamo.iditem);

    let items: Vec<Items> = conn.query_map(&query_verifc_1, |(iditem, nombre, descripcion, imagen)|{
        Items{
            iditem, nombre, descripcion, imagen
        } 
    }).expect("Ocurrio un error"); 

    if items.len() >= 2{
        let error = Error{error: String::from("Hay mas items con este id")};
        return Err(Custom(Status::Conflict, Json(error)))
    }else if items.len() == 0{
        let error = Error{error: String::from("Item no encontrado")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    let query_verifc_2 = format!("SELECT * FROM salon where idsalon='{}'", prestamo.idsalon);

    let salon: Vec<Salon> = conn.query_map(&query_verifc_2, |(idsalon, programa, idprofesor)|{
        Salon{idsalon, programa, idprofesor}
    }).expect("Ocurrio un error");

    if salon.len() >= 2{
        let error = Error{error: String::from("Hay mas salones con este id")};
        return Err(Custom(Status::Conflict, Json(error)))
    }else if salon.len() == 0{
        let error = Error{error: String::from("Salon no encontrado")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    let query_verifc_3 = format!("SELECT * FROM profesor WHERE idprofesor='{}'", prestamo.idprofesor);

    let profesores: Vec<Profesor> = conn.query_map(&query_verifc_3, |(idprofesor, nombre, apellido)|{
        Profesor{idprofesor, nombre, apellido}
    }).expect("Ocurrio un error en la consulta");

    if profesores.len() >= 2{
        let error = Error{error: String::from("Hay mas salones con este id")};
        return Err(Custom(Status::Conflict, Json(error)))
    }else if profesores.len() == 0{
        let error = Error{error: String::from("Salon no encontrado")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    let query = String::from("INSERT INTO prestamo(idusuario, iditem, idsalon, estado, idprofesor, idestudiante) values(?, ?, ?, ?, ?, ?)");

    conn.exec_drop(&query,(&token.to_string(), &prestamo.iditem, &prestamo.idsalon, 0, &prestamo.idprofesor, &prestamo.idestudiante)).expect("Ocurrio un error en el prestamo");

    let id = conn.last_insert_id();

    let query_1 = String::from("INSERT INTO historial(fecha, hora, estado, idprestamo) values(?, ?, ?, ?)");

    conn.exec_drop(&query_1, (Utc::now().date_naive().to_string(), Local::now().time().to_string(), 0, &id)).expect("Error en guardar el historial");

    let message = Message{
        message: String::from("Prestamo realizado") 
    };

    Ok(Json(message))
}
