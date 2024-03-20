#[macro_use] extern crate rocket;

mod controllers;
mod models;
mod config;
mod cors;
mod middleware;

use controllers::*;
use cors::*;

#[launch]
async fn rocket() -> _ {
    rocket::build().mount("/", routes![login,token ]).attach(CORS)
}

