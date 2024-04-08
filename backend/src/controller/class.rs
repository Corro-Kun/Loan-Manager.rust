use crate::models::{data_base::*, response_models::{Error, *},};
use crate::config::connect;
use rocket::response::status::Custom;
use rocket::http::Status;
use rocket::serde::json::Json;
use mysql::{prelude::Queryable, *};

/* 
    ROUTES AND FUCTION 

    /class[get] (get_class_all): Retrieve the complete class.

    /class/empty[get] (get_class_empty): Retrieve the class without teacher.

    /class[post] (post_class): Create class without teacher.

*/


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
        Salon {idsalon, idprofesor: String::from("1234"), programa}
    }).expect("Ocurrio un error en la consulta");

    Ok(Json(list_class))
}

#[get("/class/complet/<id>")]
pub fn get_class_everthing(id: &str) -> Result<Json<ClassComplet>, Custom<Json<Error>>>{
    let mut conn = connect();

    let query = format!("SELECT salon.idsalon, salon.programa, profesor.idprofesor, profesor.nombre, profesor.apellido FROM salon JOIN profesor ON profesor.idprofesor = salon.idprofesor WHERE idsalon = '{}'", id);

    let data = conn.query_map(&query, |(idsalon, programa, idprofesor, nombre, apellido)|{
        ClassComplet{idsalon, programa, idprofesor, nombre, apellido}
    }).expect("Ocurrio un error en la consulta");

    if data.len() >= 2{
        let error = Error{error: String::from("hay mas clases con ese id")};
        return Err(Custom(Status::Conflict, Json(error)))
    }else if data.len() == 0{
        let error = Error{error: String::from("No se encontro la clase")};
        return Err(Custom(Status::NotFound, Json(error)))
    }

    let one_data = data[0].clone();

    Ok(Json(one_data))
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


