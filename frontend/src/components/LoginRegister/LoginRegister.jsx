import "./LoginRegister.css"
import { useProfile } from "../../context/profile";
import {toast} from "sonner";

export default function LoginRegister(){
  const {ChangerLogin, HandleLogin} = useProfile();

  return(
  <div className="Render-LoginRegister">
  <div className="Login-Register-DolHack" >
    <div className="Login-Home">
      <h2>Iniciar sesión</h2>
        <form onSubmit={(e)=> toast.promise(HandleLogin(e),{
            loading: "Iniciando sesión...",
            success: "Bienvenido",
            error: (err) => err
          })} >
          <div className="Input-box">
            <input 
              type="text" 
              required
              name="cedula" 
              onChange={(e)=>ChangerLogin(e)}
              />
            <label>cedula</label>
          </div>
          <div className="Input-box">
            <input 
            type="password" 
            required
            name="contraseña" 
            onChange={(e)=>ChangerLogin(e)}
            />
            <label>Contraseña</label>
          </div>
          <button type="submit" className="BTN-Login" >Iniciar</button>
        </form>
    </div>
  </div>
  </div>
  );
}
