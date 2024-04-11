import "./History.css";

export default function History(){
  return(
    <div className="History-Render" >
      <div className="History-Bar" >
        <h2>X</h2>
      </div>
      <div className="History-Content" >
        <div className="History-Card">
          <picture>
            <img src="https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170514531/77987158-dise%C3%B1o-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg" />
          </picture>
          <div className="History-Text" >
            <p  style={{marginBottom: "5px"}} >4-11-2024 11:50</p>
            <p>El usuario [nombre del usuario] informa que el artículo [Nombre del Artículo] ha sido prestado al estudiante [Nombre del Estudiante] en el salón [Nombre del Salón]. Este préstamo ha sido registrado y supervisado por [Nombre del Profesor Encargado] en el programa [].</p>
          </div>
          <picture>
            <img src="https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170514531/77987158-dise%C3%B1o-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg" />
          </picture>
        </div>
      </div>
    </div>
  );
}
