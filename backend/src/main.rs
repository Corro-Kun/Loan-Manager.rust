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
               post_item, get_item, 
               get_class_all,get_class_empty, post_class, 
               post_teacher, post_teacher_class, 
               post_student])
        .mount("/upload", FileServer::from("./upload"))
        .attach(CORS)
}

