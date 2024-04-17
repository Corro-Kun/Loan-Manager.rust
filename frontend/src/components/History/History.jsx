import "./History.css";
import {useEffect, useState} from "react";
import {getHistory} from "../../api/api.js";
import { GiExitDoor } from "react-icons/gi";
import {useNavigate} from "react-router-dom";

export default function History(){
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  async function ConsultHistory(){
    const data = await getHistory(); 
    setHistory(data.reverse());
  }

  useEffect(()=>{
    ConsultHistory();
  },[]);

  return(
    <div className="History-Render" >
      <div className="History-Bar" >
        <h2 onClick={()=> navigate("/prestamista")} ><GiExitDoor /></h2>
      </div>
      <div className="History-Content" >
        {
          history.map((data, i)=>(
          <div key={i} className="History-Card">
            <picture>
              { data?.estado === "0" ?
              <img src={data?.imagen_user} />
              :
              <img src="http://localhost:8000/upload/predefault/check.png" />
              }
            </picture>
            <div className="History-Text" >
              <p  style={{marginBottom: "10px"}} >{data?.hora} {data?.fecha} {data?.estado === "0" ? <samp>préstamo</samp> : <samp>devuelto</samp>} </p>
              { data?.estado === "0" ?
              <p>El usuario <b>{data?.nombre_user}</b> informa que el artículo <b>{data?.nombre_item}</b> ha sido prestado al estudiante <b>{data?.nombre_student}</b> en el salón <b>{data?.idsalon}</b>. Este préstamo ha sido solicitado por el profesor <b>{data?.nombre_profesor}</b> en el programa <b>{data?.programa}</b>.</p>
              :
              <p>El Artículo <b>{data?.nombre_item}</b> que presto el usuario <b>{data?.nombre_user}</b> ha sido devuelto en perfectas condiciones después de ser prestado al estudiante <b>{data?.nombre_student}</b> en el salón <b>{data?.idsalon}</b> encargado por el profesor <b>{data?.nombre_profesor}</b> en el programa <b>{data?.programa}</b>.</p>
              }
            </div>
            <picture>
              <img src={data?.imagen_item} />
            </picture>
          </div>
          ))
        }
     </div>
    </div>
  );
}
