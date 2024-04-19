import {useEffect} from "react";
import "./ListAvailable.css";
import { useLend } from "../../context/lend";
import {IMAGES} from "../../CONSTANS.js";

export default function ListAvaliable(){
  const {items, getItems, searchItem, saveItem} = useLend();

  useEffect(()=>{
    getItems();
  },[]);

  return(
    <div className="ListAvaliable-Div" >
      <div className="ListAvaliable-Input" >
        <input type="text" placeholder="id" onChange={(e)=> searchItem(e)} />
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
