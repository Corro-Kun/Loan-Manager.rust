import {useRef} from "react";
import "./FormItem.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import {useAdmin} from "../../context/admin.jsx";

export default function FormItem(){
  const {changerItem, handleItem} = useAdmin();
  const inputImg = useRef(null);

  return(
    <div className="FormItem-Render-Div" >
      <form className="FormItem-Div" onSubmit={(e)=> handleItem(e)} >
        <div className="FormItem-H2" >
          <h2>Crear un item</h2>
        </div>
        <div className="FormItem-Div-Picture" >
          <button><FaLongArrowAltLeft /></button>
          <picture onClick={()=> inputImg.current.click()} >
            <img src="http://localhost:8000/upload/predefault/llaves.png" />
          </picture>
          <input style={{display: "none"}} type="file" ref={inputImg} onChange={(e)=> changerItem(e)} />
          <button><FaLongArrowAltRight /></button>
        </div>
        <div className="FormItem-Div-Form" >
          <div>
            <label>Id</label>
            <input name="iditem" type="text" required onChange={(e)=> changerItem(e)} />
          </div>
          <div>
            <label>Nombre</label>
            <input name="nombre" type="text" required onChange={(e)=> changerItem(e)} />
          </div>
          <div>
            <label>Descripción</label>
            <textarea name="descripcion" required onChange={(e)=> changerItem(e)} />
          </div>
        </div>
        <div className="FormItem-Div-Button" >
          <button>Crear</button>
          <button>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
