import "./CardProfile.css";
import { useEffect } from "react";
import {useProfile} from "../../context/profile.jsx";
import {IMAGES} from "../../CONSTANS.js";

export default function CardProfile(){
  const {GetProfile, profile} = useProfile();

  useEffect(()=>{
    GetProfile();
  },[]);

  return(
    <div className="CardProfile-Div" >
      {
        profile?.rol == 1? 
          <>
            <picture>
              <img src={`${IMAGES}/upload/predefault/admin.png`} />
            </picture>
            <div>
              <h2>{profile?.nombre}</h2>
            </div>
          </>
        :
          <>
            <picture>
              <img src={`${IMAGES}${profile?.imagen}`} />
            </picture>
            <h3>{profile?.idusuario}</h3>
            <div>
              <h2>{profile?.nombre} {profile?.apellido}</h2>
            </div>
          </>
      }
    </div>
  );
}
