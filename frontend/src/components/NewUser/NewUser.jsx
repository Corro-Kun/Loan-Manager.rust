import "./NewUser.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

export default function NewUser(){
  const navigate = useNavigate(); 

  return(
    <div className="NewUser-Render-Div" >
      <div className="NewUser-Div" >
        <div className="NewUser-Input" >
          <div className="NewUser-Quite-Div" >
            <h2 className="NewUser-Quite" onClick={()=> navigate("/admin")} ><FaArrowRightFromBracket /></h2>
          </div>
          <div className="NewUser-Input-Label" >
            <label>Documento</label>  
            <input type="text" required />
          </div>
          <div className="NewUser-Input-Label" >
            <label>Nombre</label>
            <input type="text" required />
          </div>
          <div className="NewUser-Input-Label" >
            <label>Apellido</label>
            <input type="text" required />
          </div>
          <div className="NewUser-Input-Label" >
            <label>Contraseña</label>
            <input type="password" required />
          </div>
        </div>
        <div className="NewUser-Img" >
          <picture>
            <img src="https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170514693/77979774-dise%C3%B1o-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg" />
          </picture>
        </div>
      </div>
    </div>
  );
}
