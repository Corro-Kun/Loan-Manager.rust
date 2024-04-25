extern crate mysql;
use mysql::*;

pub fn connect() -> PooledConn{
    let opts = Opts::from_url("mysql://root:1234@localhost:3306/bosque").expect("No se pudo conectar");

    let pool = Pool::new(opts).expect("No se pudo conectar");
    let conn = pool.get_conn().expect("No se pudo conectar");

    conn
}
