import "./NewUser.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";

export default function NewUser(){
  const navigate = useNavigate(); 
  const inputImage = useRef(null);

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
          <div className="NewUser-Buttons" >
            <button>Crear</button>
          </div>
        </div>
        <div className="NewUser-Img" >
          <picture onClick={()=> inputImage.current.click()} >
            <img src="https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170514693/77979774-dise%C3%B1o-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg" />
          </picture>
          <input type="file" required style={{display: "none"}} ref={inputImage} />
        </div>
      </div>
    </div>
  );
}
