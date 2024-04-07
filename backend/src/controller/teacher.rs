use crate::models::{data_base::*, response_models::{Error, *}, request_models::*};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use mysql::{prelude::Queryable, *};


/* 
    ROUTES AND FUCTION 

    /teacher[post] (post_teacher): This router creates a new teacher in the database without assigning a class.

    /teacher/class[post] (post_teacher_class): Assigning a class to for teacher.

*/


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

