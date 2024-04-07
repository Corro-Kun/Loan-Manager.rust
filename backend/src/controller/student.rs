use crate::models::{data_base::*, response_models::{Error, *}};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use mysql::{prelude::Queryable, *};

#[post("/student", format = "application/json", data = "<student>")]
pub fn post_student(student: Json<Estudiante>) -> Result<Json<Message>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query_1 = format!("SELECT * FROM estudiante where idestudiante='{}'", student.idestudiante);

    let list_student: Vec<Estudiante> = conn.query_map(&query_1, |(idestudiante, nombre, apellido)|{
        Estudiante{idestudiante, nombre, apellido}
    }).expect("Error en la consulta");

    if list_student.len() >= 1{
        let error = Error{error: String::from("Ya existe un estudiante con ese id")};
        return Err(Custom(Status::Conflict, Json(error)))
    }

    let query_2 = String::from("INSERT INTO estudiante(idestudiante, nombre, apellido) values (?, ?, ?)");

    conn.exec_drop(&query_2, (&student.idestudiante, &student.nombre, &student.apellido)).expect("Error en agregar el estudiante");

    
    let message = Message{
        message: String::from("Se creo al estudiante sin problemas")
    };

    Ok(Json(message)) 
}


