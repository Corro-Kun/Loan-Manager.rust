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

#[post("/newuser", data = "<usuario>")]
pub async fn add_user(mut usuario: Form<AddUser<'_>>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let user: Vec<Usuario> = conn.query_map(format!("SELECT * FROM usuario WHERE idusuario='{}'", usuario.idusuario),|(idusuario, nombre, apellido, imagen, rol, contraseña)|{
        Usuario {idusuario, nombre, apellido, imagen, rol, contraseña}
    }).expect("Ocurrio un error");

    if user.len() >= 1{
        let error = Error{error: String::from("este usuario ya existe")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let path = format!("./upload/{}.png",usuario.idusuario);

    usuario.file.copy_to(&path).await.expect("Error a la hora de guardar la imagen");

    let query = "INSERT INTO usuario(idusuario, nombre, apellido, imagen, rol, contraseña) VALUES(?, ?, ?, ?, ?, ?)";

    conn.exec_drop(query, (&usuario.idusuario, &usuario.nombre, &usuario.apellido, format!("http://localhost:8000/upload/{}.png",usuario.idusuario), usuario.rol, &usuario.contraseña))
        .expect("Ocurrio un Error al guardar");

    let message = Message{
        message: String::from("Usuario creado") 
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
