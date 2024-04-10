use crate::models::{data_base::*, response_models::{Error, *}, request_models::*};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::form::Form;
use mysql::{prelude::Queryable, *};


/* 
    ROUTES AND FUCTION 

    /item[get] (get_item): Retrieve the complet items

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

