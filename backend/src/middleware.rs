use rocket::http::Status;
use rocket::request::{Outcome, Request, FromRequest};


#[derive(Clone)]
pub struct ApiKey(String);

#[derive(Debug)]
pub enum ApiKeyError {
    Missing,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for ApiKey {
    type Error = ApiKeyError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        match req.headers().get_one("token") {
            None => Outcome::Error((Status::BadRequest, ApiKeyError::Missing)),
            Some(key) => Outcome::Success(ApiKey(key.to_string()))
        }
    }
}

impl std::fmt::Display for ApiKey {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}
