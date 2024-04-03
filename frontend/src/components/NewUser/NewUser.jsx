import "./NewUser.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useAdmin} from "../../context/admin.jsx";
import {toast} from "sonner";

export default function NewUser(){
  const navigate = useNavigate(); 
  const inputImage = useRef(null);
  const [img, setImg] = useState("https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170514693/77979774-dise%C3%B1o-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg");
  const {changerUsuario, handleUsuario, changerCreation, profesor, changerClass, HandleClass, classEmpty} = useAdmin();

  return(
    <div className="NewUser-Render-Div" >
      <form className="NewUser-Div" onSubmit={(e)=> toast.promise(handleUsuario(e),{
        loading: "Creando usuario...",
        success: "Usuario creado",
        error: (err)=> err
      })} >
        <div className="NewUser-Input" >
          <div className="NewUser-Quite-Div" >
            <h2 className="NewUser-Quite" onClick={()=> navigate("/admin")} ><FaArrowRightFromBracket /></h2>
            <select onClick={(e)=> changerCreation(e)} >
              <option value="0" >Usuario</option>
              <option value="1" >Profesor</option>
            </select>
          </div>
          <div className="NewUser-Input-Label" >
            <label>Documento</label>  
            <input type="text" required onChange={(e)=> changerUsuario(e)} name="idusuario" autoFocus />
          </div>
          <div className="NewUser-Input-Label" >
            <label>Nombre</label>
            <input type="text" required onChange={(e)=> changerUsuario(e)} name="nombre" />
          </div>
          <div className="NewUser-Input-Label" >
            <label>Apellido</label>
            <input type="text" required onChange={(e)=> changerUsuario(e)} name="apellido" />
          </div>
          <div style={profesor? {display: "none"} : {}} className="NewUser-Input-Label" >
            <label>Contraseña</label>
            <input type="password" required onChange={(e)=> changerUsuario(e)} name="contraseña"/>
          </div>
          <div className="NewUser-Buttons" >
            <button>Crear</button>
          </div>
        </div>
        <div style={profesor? {display: "none"} : {}} className="NewUser-Img" >
          <picture onClick={()=> inputImage.current.click()} >
            <img src={img} />
          </picture>
          <input type="file" required style={{display: "none"}} ref={inputImage} name="file" onChange={(e)=> {
            setImg(URL.createObjectURL(e.target.files[0]));
            changerUsuario(e)}} />
        </div>
        <div style={profesor? {} : {display:"none"}} className="NewUser-Class" >
          <div className="NewUser-Class-Select" >
            <h3 style={{textAlign: "center", marginTop: "2px", color: "var(--Text_Color)"}} >Seleciona una clase (opcional)</h3>
            {
              classEmpty?.map((data)=>(
                <div>
                  <p>{data.programa}</p>
                  <h3>{data.idsalon}</h3>
                </div>
              ))
            }
          </div>
          <div className="NewUser-Class-Create" >
            <h3 style={{textAlign: "center",margin: "2px 0 20px 0", color: "var(--Text_Color)"}} >Crear una clase (opcional)</h3>
            <div style={{margin: "0 10px"}} className="NewUser-Input-Label" >
              <label>Id</label>
              <input type="text" name="idsalon" onChange={(e)=> changerClass(e)} />
            </div>
            <div style={{margin: "0 10px"}} className="NewUser-Input-Label" >
              <label>Programa</label>
              <input type="text" name="programa" onChange={(e)=> changerClass(e)} />
            </div>
            <div className="NewUser-Buttons" >
              <button type="button" onClick={()=> toast.promise(HandleClass(),{
                success: "Clase creada",
                loading: "Creando Clase...",
                error: (err)=> err
              })} >Crear</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
