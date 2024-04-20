import {useEffect} from "react";
import "./ListAvailable.css";
import { useLend } from "../../context/lend";
import {IMAGES} from "../../CONSTANS.js";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";


export default function ListAvaliable(){
  const {items, getItems, searchItem, saveItem} = useLend();
  const navegate = useNavigate();

  useEffect(()=>{
    getItems();
  },[]);

  return(
    <div className="ListAvaliable-Div" >
      <div className="ListAvaliable-Input" >
        <h2 style={{color: "var(--Body_Color)"}} ><FaArrowRightFromBracket /></h2>
        <input type="text" placeholder="id" onChange={(e)=> searchItem(e)} />
        <h2 onClick={()=> navegate("/gestion/prestamo")} ><FaArrowRightFromBracket /></h2>
      </div>
      <div className="ListAvaliable-Content" >
        {
          items.map((i, a)=> (
            <div key={i.iditem} className="ListAvaliable-Card" onClick={()=> saveItem(a)} >
              <picture>
                <img src={`${IMAGES}${i.imagen}`} />
              </picture>
              <p>{i.iditem}</p>
              <h3>{i.nombre}</h3>
            </div>
          ))
        }
     </div>
    </div> 
  );
}
