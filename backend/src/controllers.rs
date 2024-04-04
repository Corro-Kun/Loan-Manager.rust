use crate::models::{data_base::*, response_models::{Error, *}, request_models::*};
use crate::config::connect;
use crate::middleware::ApiKey;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::form::Form;
use mysql::{prelude::Queryable, *};

#[post("/login", format = "application/json", data = "<login_data>")]
pub fn login(login_data: Json<Login>) -> Result<Json<Id>,Custom<Json<Error>>>{
    let mut conn = connect();

    let query = format!("select * from usuario where idusuario='{}'",login_data.cedula);

    let user: Vec<Usuario> = conn.query_map(query, |(idusuario, nombre, apellido, imagen, rol, contraseña)|{
       Usuario {idusuario, nombre, apellido, imagen, rol, contraseña}
    }).expect("No se pudo obtener usuarios");

    if user.len() != 1 {
        let error = Error{error: String::from("Usuario no encontrado")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    if user[0].contraseña != login_data.contraseña {
        let error = Error{error: String::from("Contraseña incorrecta")};
        return Err(Custom(Status::Unauthorized, Json(error)))
    }

    let data = Id{
        id: user[0].idusuario.clone()
    };

    Ok(Json(data))
}

#[get("/profile")]
pub fn profile(token: ApiKey) -> Result<Json<Usuario>,Custom<Json<Error>>>{
    let mut conn = connect();

    let query = format!("SELECT * FROM usuario WHERE idusuario='{}'", token);

    let user: Vec<Usuario> = conn.query_map(query, |(idusuario, nombre, apellido, imagen, rol, contraseña)|{
       Usuario {idusuario, nombre, apellido, imagen, rol, contraseña}
    }).expect("No se pudo obtener usuarios");

    if user.len() != 1 {
        let error = Error{error: String::from("Usuario no encontrado")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    let data = &user[0];

    Ok(Json(data.clone()))
}

#[post("/user", data = "<usuario>")]
pub async fn add_user(mut usuario: Form<AddUser<'_>>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query1 = format!("SELECT * FROM usuario WHERE idusuario='{}'", usuario.idusuario);

    let user: Vec<Usuario> = conn.query_map(&query1,|(idusuario, nombre, apellido, imagen, rol, contraseña)|{
        Usuario {idusuario, nombre, apellido, imagen, rol, contraseña}
    }).expect("Ocurrio un error");

    if user.len() >= 1{
        let error = Error{error: String::from("este usuario ya existe")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let path = format!("./upload/user/{}.png",usuario.idusuario);

    usuario.file.copy_to(&path).await.expect("Error a la hora de guardar la imagen");

    let query = "INSERT INTO usuario(idusuario, nombre, apellido, imagen, rol, contraseña) VALUES(?, ?, ?, ?, ?, ?)";

    conn.exec_drop(query, (&usuario.idusuario, &usuario.nombre, &usuario.apellido, format!("http://localhost:8000/upload/user/{}.png",usuario.idusuario), &usuario.rol, &usuario.contraseña))
        .expect("Ocurrio un Error al guardar");

    let message = Message{
        message: String::from("Usuario creado") 
    };

    Ok(Json(message))
}

#[get("/user")]
pub fn get_user() -> Result<Json<Vec<Usuario>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("SELECT * FROM usuario");

    let user: Vec<Usuario> = conn.query_map(&query, |(idusuario, nombre, apellido, imagen, rol, contraseña)|{
        Usuario{idusuario, nombre, apellido, imagen, rol, contraseña}
    }).expect("Ocurrio un error");

    Ok(Json(user))
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

#[get("/item")]
pub fn get_item() -> Result<Json<Vec<Items>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("SELECT * FROM items");

    let items: Vec<Items> = conn.query_map(query, |(iditem, nombre, descripcion, imagen)|{
        Items{iditem, nombre, descripcion, imagen}
    }).expect("Ocurrio un error en la consulta de items");

    Ok(Json(items))
}

#[get("/class")]
pub fn get_class_all() -> Result<Json<Vec<Salon>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("select programa, idsalon from salon");

    let list_class: Vec<Salon> = conn.query_map(&query, |(idsalon, programa)|{
        Salon {idsalon, programa, idprofesor: String::from("1234")}
    }).expect("Ocurrio un error en la consulta");

    Ok(Json(list_class))
}

#[get("/class/empty")]
pub fn get_class_empty() -> Result<Json<Vec<Salon>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("select programa, idsalon from salon where idprofesor is null");

    let list_class: Vec<Salon> = conn.query_map(&query, |(idsalon, programa)|{
        Salon {idsalon, programa, idprofesor: String::from("1234")}
    }).expect("Ocurrio un error en la consulta");

    Ok(Json(list_class))
}

#[post("/class", format = "application/json" ,data = "<salon>")]
pub fn post_class(salon: Json<Salon>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query1 = format!("select * from salon where idsalon='{}'", salon.idsalon);

    let list_class: Vec<Salon> = conn.query_map(&query1, |(idsalon, programa, idprofesor)|{
        Salon{idsalon, programa, idprofesor}
    }).expect("Ocurrio un error en la consulta");

    if list_class.len() >= 1{
        let error = Error{error: String::from("Ya existe una clase con ese ID")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let query2 = String::from("insert into salon(idsalon, programa) values (?, ?)");

    conn.exec_drop(&query2, (&salon.idsalon, &salon.programa)).expect("Error a la hora de crear el salon");

    let message = Message{
        message: String::from("Se creo la clase sin problemas")
    };

    Ok(Json(message)) 
}

#[post("/teacher", format = "application/json", data = "<teacher>")]
pub fn post_teacher(teacher: Json<Profesor>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query_1 = format!("SELECT * FROM profesor where idprofesor='{}'", teacher.idprofesor);

    let list_teacher: Vec<Profesor> = conn.query_map(&query_1, |(idprofesor, nombre, apellido)|{
        Profesor{idprofesor, nombre, apellido}
    }).expect("Ocurrio un error en la consulta");

    if list_teacher.len() >= 1{
        let error = Error{error: String::from("Ya existe este profesor con ese ID")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let query_2 = String::from("insert into profesor(idprofesor, nombre, apellido) values (?,?,?)");

    conn.exec_drop(&query_2, (&teacher.idprofesor, &teacher.nombre, &teacher.apellido)).expect("Error al crear al profesor");

    let message = Message{
        message: String::from("Se creo el profesor sin problemas")
    };

    Ok(Json(message)) 
}

#[post("/teacher/class", format = "application/json", data = "<teacher>")]
pub fn post_teacher_class(teacher: Json<TeacherWithClass>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query_1 = format!("SELECT * FROM profesor where idprofesor='{}'", teacher.idprofesor);

    let list_teacher: Vec<Profesor> = conn.query_map(&query_1, |(idprofesor, nombre, apellido)|{
        Profesor{idprofesor, nombre, apellido}
    }).expect("Ocurrio un error en la consulta");

    if list_teacher.len() < 1{
        let error = Error{error: String::from("No se encontro al profesor")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    if list_teacher.len() >= 2{
        let error = Error{error: String::from("No se identifica al profesor")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let query_2 = String::from("UPDATE salon SET idprofesor = ? WHERE idsalon = ?"); 

    conn.exec_drop(&query_2, (&teacher.idprofesor, &teacher.idsalon)).expect("Error al guardar al profesor en esa clase");

    let message = Message{
        message: String::from("Se creo el profesor sin problemas")
    };

    Ok(Json(message)) 
  
}

/*
#[post("/upload", data = "<upload>")]
pub async fn add_user(mut upload: Form<AddUser<'_>>) -> String{
    upload.file.copy_to("./upload/imagen.png").await.expect("error a la hora de guardar la imagen");

    format!("hola {:?}",upload.file.content_type())
}
*/
