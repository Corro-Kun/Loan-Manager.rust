import "./CardProfile.css";
import { useEffect } from "react";
import {useProfile} from "../../context/profile.jsx";

export default function CardProfile(){
  const {GetProfile} = useProfile();

  useEffect(()=>{
    GetProfile();
  },[]);

  return(
    <div className="CardProfile-Div" >
      <picture>
        <img src="https://statics.forbes.com.ec/2022/01/crop/61eabe20211cb__400x260.webp" />
      </picture>
      <h3>1068512456</h3>
      <div>
        <h2>Sergio Sevilla</h2>
      </div>
    </div>
  );
}
