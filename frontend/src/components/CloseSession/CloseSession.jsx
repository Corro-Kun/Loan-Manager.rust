import "./CloseSession.css";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

export function CloseSession(){
  const navigate = useNavigate();

  function Close(){
    localStorage.removeItem("idBosque");
    navigate("/");
    toast.success("Sesión serrada correactamente");
  }

  return(
    <div className="CloseSession-Div" >
      <button onClick={()=> Close()} >Serrar sesión</button>
    </div>
  );
}
