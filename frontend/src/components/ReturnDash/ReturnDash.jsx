import "./ReturnDash.css";
import {useNavigate} from "react-router-dom";

export default function ReturnDash(){
  const navegate = useNavigate();

  return(
    <div className="ReturnDash-Panel" >
      <div className="ReturnDash-Title" >
        <h3></h3>
        <h2>Selecciona un item para devolver</h2>
        <h3></h3>
      </div>
      <div className="ReturnDash-Picture" >
        <picture onClick={()=> navegate("/gestion/devolver/selecionar")} >
          <img src="https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg" />
        </picture>
      </div>
      <div className="ReturnDash-Button" >
        <button>Devolver</button>
      </div>
    </div>
  );
}
