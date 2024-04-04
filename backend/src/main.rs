#[macro_use] extern crate rocket;

mod controllers;
mod models;
mod config;
mod cors;
mod middleware;

use controllers::*;
use cors::*;
use rocket::fs::FileServer;

#[launch]
async fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![login, profile, add_user, get_user, post_item, get_item, get_class_all,get_class_empty, post_class, post_teacher])
        .mount("/upload", FileServer::from("./upload"))
        .attach(CORS)
}

