import "./ReturnDash.css";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useReturnLend} from "../../context/returnLend";
import { IoMdCloseCircle } from "react-icons/io";

export default function ReturnDash(){
  const navegate = useNavigate();
  const {itemR, getData, quiteReturn} = useReturnLend();

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
                <img src={itemR?.imagen} />
              </picture>
              <h3>{itemR?.nombre}</h3>
            </div>
         </div>
        :
          <div className="ReturnDash-Picture" >
            <picture onClick={()=> navegate("/gestion/devolver/selecionar")} >
              <img src="https://cdn-icons-png.flaticon.com/512/7941/7941531.png" />
            </picture>
          </div>
      }
      <div className="ReturnDash-Button" >
        <button>Devolver</button>
      </div>
    </div>
  );
}
