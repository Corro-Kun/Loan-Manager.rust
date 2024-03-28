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
    rocket::build().mount("/", routes![login, profile, add_user, get_user]).mount("/upload", FileServer::from("./upload")).attach(CORS)
}

