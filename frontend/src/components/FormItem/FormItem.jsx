import "./FormItem.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export default function FormItem(){
  return(
    <div className="FormItem-Render-Div" >
      <div className="FormItem-Div" >
        <div className="FormItem-H2" >
          <h2>Crear un item</h2>
        </div>
        <div className="FormItem-Div-Picture" >
          <button><FaLongArrowAltLeft /></button>
          <picture>
            <img src="https://img.freepik.com/vector-premium/caricatura-juego-llaves-anillo-negro_9206-7523.jpg" />
          </picture>
          <button><FaLongArrowAltRight /></button>
        </div>
        <div className="FormItem-Div-Form" >
          <div>
            <label>Id</label>
            <input type="text" required />
          </div>
          <div>
            <label>Nombre</label>
            <input type="text" required />
          </div>
          <div>
            <label>Descripción</label>
            <textarea required />
          </div>
        </div>
        <div className="FormItem-Div-Button" >
          <button>Crear</button>
          <button>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
