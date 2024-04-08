pub mod data_base{
    use serde::{Serialize,Deserialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Horario{
        idhorario: i64,
        fecha: String,
        hora: String,
        estado: u8,
        idprestamo: i64
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Items{
        pub iditem: String,
        pub nombre: String,
        pub descripcion: String,
        pub imagen: String
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Prestamo{
        idprestamo: i64,
        idusuario: String,
        iditem: String,
        idsalon: String,
        estado: i8,
        idprofesor: String
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Profesor{
        pub idprofesor: String,
        pub nombre: String,
        pub apellido: String,
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Salon{
        pub idsalon: String,
        pub programa: String,
        pub idprofesor: String
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Usuario{
        pub idusuario: String,
        pub nombre: String,
        pub apellido: String,
        pub imagen: String,
        pub rol: i8,
        pub contraseña: String
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Estudiante{
        pub idestudiante: String,
        pub nombre: String,
        pub apellido: String
    }
}

pub mod response_models{
    use serde::{Serialize,Deserialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Error{
        pub error: String
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Id{
        pub id: String
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Message{
        pub message: String
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct ClassComplet{
        pub idsalon: String,
        pub programa: String,
        pub idprofesor: String,
        pub nombre: String,
        pub apellido: String
    }
}

pub mod request_models{
    use serde::{Serialize, Deserialize};
    use rocket::form::FromForm;
    use rocket::fs::TempFile;

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Login{
        pub cedula: String,
        pub contraseña: String
    }

    #[derive(FromForm)]
    pub struct AddUser<'r>{
        pub idusuario: String,
        pub nombre: String,
        pub apellido: String,
        pub rol: i64,
        pub contraseña: String,
        pub file: TempFile<'r>, 
    }

    #[derive(FromForm)]
    pub struct AddItem<'r>{
        pub iditem: String,
        pub nombre: String,
        pub descripcion: String,
        pub file: TempFile<'r>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct TeacherWithClass{
        pub idprofesor: String,
        pub idsalon: String
    }
}
