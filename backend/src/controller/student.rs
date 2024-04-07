use crate::models::{data_base::*, response_models::{Error, *}};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use mysql::{prelude::Queryable, *};

/* 
    ROUTES AND FUCTION 

    /student[get] (get_student): Consult all students of the database:

    /student[get] (get_student_by_id): search for a student for their id in the database

    /student[post] (post_student): Create student.

*/

#[get("/student")]
pub fn get_student() -> Result<Json<Vec<Estudiante>>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = String::from("SELECT * FROM estudiante");

    let list_student: Vec<Estudiante> = conn.query_map(&query, |(idestudiante, nombre, apellido)|{
        Estudiante{idestudiante, nombre, apellido}
    }).expect("Ocurrio un error");

    Ok(Json(list_student))
}

#[get("/student/<id>")]
pub fn get_student_by_id(id: &str) -> Result<Json<Estudiante>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query =format!("SELECT * FROM estudiante where idestudiante='{}'", id);

    let student: Vec<Estudiante> = conn.query_map(&query, |(idestudiante, nombre, apellido)|{
        Estudiante{idestudiante, nombre, apellido}
    }).expect("Ocurrio un error");

    if student.len() >=2 {
        let error = Error{error: String::from("Hay mas usuarios con ese id")};
        return Err(Custom(Status::Conflict, Json(error)))
    }else if student.len() == 0{
        let error = Error{error: String::from("No se encontro al estudiante")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    let one_student = student[0].clone();

    Ok(Json(one_student))
}

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


