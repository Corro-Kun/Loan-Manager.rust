import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import { useAdmin } from "../../context/admin";
import {toast} from "sonner";

export default function NewStudent(){
  const navigate = useNavigate();
  const {handleStudent, changerUsuario} = useAdmin();
  return(
    <div className="NewUser-Render-Div" >
      <form className="NewUser-Div" onSubmit={(e)=> toast.promise(handleStudent(e),{
        loading: "Creando estudiante...",
        success: "Estudiante creado",
        error: (err)=> err
      })} >
        <div className="NewUser-Input" style={{width: "100%"}} >
          <div className="NewUser-Quite-Div" >
            <h2 className="NewUser-Quite" onClick={()=> navigate("/admin")} ><FaArrowRightFromBracket /></h2>
          </div>
          <h3 style={{textAlign: "center", padding: "10px"}} >Crear estudiante</h3>
          <div className="NewUser-Input-Label" >
            <label>Id</label>  
            <input type="text" required name="idestudiante" autoFocus onChange={(e)=> changerUsuario(e)} />
          </div>
          <div className="NewUser-Input-Label" >
            <label>nombre</label>  
            <input type="text" required name="nombre" onChange={(e)=> changerUsuario(e)} />
          </div>
          <div className="NewUser-Input-Label" >
            <label>apellido</label>  
            <input type="text" required name="apellido" onChange={(e)=> changerUsuario(e)} />
          </div>
          <div className="NewUser-Buttons" >
            <button>Crear</button>
          </div>
        </div>
      </form>
    </div>
  );
}
