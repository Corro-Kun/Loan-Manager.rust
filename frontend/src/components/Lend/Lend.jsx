import "./Lend.css";
import { FaBackspace } from "react-icons/fa";

export default function Lend(){
  return(
    <div className="Lend-Render" >
      <div className="Lend-Div" >
        <div className="Lend-Title" >
          <h2>Prestar</h2>
          <h1><FaBackspace /></h1>
        </div>
        <div className="Lend-Users" >
          <div className="Lend-Teacher" >
          </div> 
          <div className="Lend-Student" >
            <div className="Lend-Ingrese-Studente" >
              <input type="text" placeholder="id..." />
              <button>Ingresar</button>
            </div>
          </div>
        </div>
        <div className="Lend-Item" >

        </div>
        <div className="Lend-ButtonSubmit" >

        </div>
      </div>
    </div>
  );
}
