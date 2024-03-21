import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {getProfile} from "../api/api.js";

export default function RolPrestamista(){
  const navigate = useNavigate();

  useEffect(()=>{
    Verif();
  },[]);

  async function Verif(){
    const {rol} = await getProfile(); 

    if(!rol){
      navigate("/");
    }else if(rol === 2){
      return
    }else if(rol === 1){
      navigate("/admin");
    }
  };

  return(
    <Outlet />
  );
}
