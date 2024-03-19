use crate::models::{data_base::*, response_models::{Error, *}, request_models::*};
use crate::config::connect;
use rocket::serde::json::Json;
use mysql::{prelude::Queryable, *};

#[post("/login", format = "application/json", data = "<login_data>")]
pub fn login(login_data: Json<Login>) -> Result<Json<Id>,Json<Error>>{
    let mut conn = connect();

    let query = format!("select * from usuario where idusuario='{}'",login_data.cedula);

    let user: Vec<Usuario> = conn.query_map(query, |(idusuario, nombre, apellido, imagen, rol, contraseña)|{
       Usuario {idusuario, nombre, apellido, imagen, rol, contraseña}
    }).expect("No se pudo obtener usuarios");

    if user.len() != 1 {
        let error = Error{error: String::from("Usuario no encontrado")};
        return Err(Json(error));
    }

    if user[0].contraseña != login_data.contraseña {
        let error = Error{error: String::from("Contraseña incorrecta")};
        return Err(Json(error)); 
    }

    let data = Id{
        id: user[0].idusuario.clone()
    };

    Ok(Json(data))
}

