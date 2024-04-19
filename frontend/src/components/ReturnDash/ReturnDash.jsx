import "./ReturnDash.css";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useReturnLend} from "../../context/returnLend";
import { IoMdCloseCircle } from "react-icons/io";
import {toast} from "sonner";
import {IMAGES} from "../../CONSTANS.js";

export default function ReturnDash(){
  const navegate = useNavigate();
  const {itemR, getData, quiteReturn, updateReturn} = useReturnLend();

  useEffect(()=>{
    getData();
  },[]);

  return(
    <div className="ReturnDash-Panel" >
      <div className="ReturnDash-Title" >
        <h2 style={{color: "var(--Body_Color)"}} >X</h2>
        <h3>Selecciona un item para devolver</h3>
        <h2 onClick={()=> quiteReturn()} ><IoMdCloseCircle /></h2>
      </div>
      {
        itemR.iditem?
          <div className="ReturnDash-Select" >
            <div>
              <picture>
                <img src={`${IMAGES}${itemR?.imagen}`} />
              </picture>
              <h3>{itemR?.nombre}</h3>
            </div>
         </div>
        :
          <div className="ReturnDash-Picture" >
            <picture onClick={()=> navegate("/gestion/devolver/selecionar")} >
              <img src={`${IMAGES}/upload/predefault/mas.png`} />
            </picture>
          </div>
      }
      <div className="ReturnDash-Button" >
        <button onClick={()=> toast.promise(updateReturn(), {
          loading: "devolviendo item...",
          success: "objeto devuelto",
          error: (e) => e
        })} >Devolver</button>
      </div>
    </div>
  );
}
