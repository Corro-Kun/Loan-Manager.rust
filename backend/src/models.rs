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

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Items{
        iditem: String,
        nombre: String,
        descripcion: String,
        imagen: String
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Prestamo{
        idprestamo: i64,
        idusuario: String,
        iditem: String,
        idsalon: String,
        estado: i8
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Profesor{
        idprofesor: String,
        nombre: String,
        apellido: String,
        imagen: String
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Salon{
        idsalon: String,
        programa: String,
        idprofesor: String
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
}

pub mod request_models{
    use serde::{Serialize, Deserialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Login{
        pub cedula: String,
        pub contraseña: String
    }
}
