import { useEffect } from "react";
import { useLend } from "../../context/lend";
import { FaBackspace } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import {toast} from "sonner";
import "./Lend.css";

export default function Lend(){
  const {changerStudent, handleStudent, apiStudent, deleteStudent, getStudentSave} = useLend();

  useEffect(()=>{
    getStudentSave();
  },[]);

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
            <div className="Lend-Ingrese-Studente" style={apiStudent.idestudiante? {display: "none"} : {}} >
              <input type="text" placeholder="id..." autoFocus name="idestudiante" onChange={(e)=> changerStudent(e)} onKeyDown={(e)=>{if (e.key === "Enter"){
                toast.promise(handleStudent(),{
                  success: "estudiante agregado",
                  loading: "buscando estudiante...",
                  error: (e)=> e
                });
              }}} />
              <button onClick={()=> handleStudent()} >Ingresar</button>
            </div>
            <div className="Lend-Student-Active" style={apiStudent.idestudiante? {} : {display: "none"}} >
              <div className="Lend-Student-Bar" >
                <h2 onClick={()=> deleteStudent()} ><HiTrash/></h2>
                <h3>Estudiante</h3>
                <h3 style={{color: "transparent"}} >X</h3>
              </div>
              <div className="Lend-Student-Card" >
                <picture>
                  <img src="https://cdn-icons-png.flaticon.com/512/2995/2995459.png" />
                </picture>
                <h3>{apiStudent?.idestudiante}</h3>
                <p>{apiStudent?.nombre} {apiStudent.apellido}</p>
              </div>
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
