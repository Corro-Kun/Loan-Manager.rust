#[macro_use] extern crate rocket;

mod models;
mod config;
mod cors;
mod middleware;
mod controller;

use controller::{auth::*, 
    item::*, user::*, class::*,
    student::*, teacher::*};

use cors::*;
use rocket::fs::FileServer;

#[launch]
async fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![login, profile, 
               add_user, get_user, 
               post_item, get_item, get_item_not_lend, post_lend,
               get_class_all,get_class_empty,get_class_everthing ,post_class, 
               get_teacher, get_teacher_by_id , post_teacher, post_teacher_class, 
               get_student, get_student_by_id ,post_student])
        .mount("/upload", FileServer::from("./upload"))
        .attach(CORS)
}

