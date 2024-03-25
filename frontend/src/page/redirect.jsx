import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { getProfile } from "../api/api";

function Redirect(){
  const navigate = useNavigate();

  useEffect(()=>{
    Send();
  });

  async function Send(){
    const {rol} = await getProfile(); 
    switch (rol) {
      case 1:
        navigate("/admin");
        break;

      case 2:
        navigate("/prestamista");
        break;
  
      default:
        navigate("/");
    }
  }

  return(
    <h2>Rediricionando...</h2>
  );
}

export default Redirect;
