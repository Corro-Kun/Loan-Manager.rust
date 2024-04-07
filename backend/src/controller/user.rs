use crate::models::{data_base::*, response_models::{Error, *}, request_models::*};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::form::Form;
use mysql::{prelude::Queryable, *};

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


