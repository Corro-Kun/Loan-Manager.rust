import { useEffect } from "react";
import { useLend } from "../../context/lend";
import { FaBackspace } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import {toast} from "sonner";
import "./Lend.css";
import {useNavigate} from "react-router-dom";

export default function Lend(){
  const {changerStudent, handleStudent, apiStudent, deleteStudent, getStudentSave, changerClass, handleClass, classs, hidenClass, deleteClass, item, deleteItem, deleteAll, handleLend, free, changerOptions, teacher, salon, changerData} = useLend();
  const navigate = useNavigate();

  useEffect(()=>{
    getStudentSave();
  },[]);

  return(
    <div className="Lend-Render" >
      <div className="Lend-Div" >
        <div className="Lend-Title" >
          <h2>Prestar</h2>
          <h1 onClick={()=>deleteAll()} ><FaBackspace /></h1>
        </div>
        <div className="Lend-Users" >
          <div className="Lend-Teacher" >
            <div style={hidenClass? {} : {display: "none"}} >
              <div className="Lend-Ingrese-Class" style={free? {display: "none"} : {}} >
              <input type="text" placeholder="id de la clase" name="idclase" onChange={(e)=> changerClass(e)} onKeyDown={(e)=>{if (e.key === "Enter"){
                toast.promise(handleClass(),{
                  success: "clase agregada",
                  loading: "buscando clase...",
                  error: (e)=> e
                }); 
              }}}  />
              <select onChange={(e)=>changerOptions(e)} >
                <option value={0} >clase</option>
                <option value={1} >libre</option>
              </select>
              <button onClick={()=> toast.promise(handleClass(),{
                success: "clase agregada",
                loading: "buscando clase...",
                error: (e)=> e
              })} >Ingresar</button> 
              </div>
              <div className="Lend-Teacher-Free" style={free? {} : {display:"none"}} >
                <div className="Lend-Teacher-Free-Div" >
                  <label>Profesor</label>
                  <input type="text" />
                  <select name="profesor" onChange={(e)=> changerData(e)} >
                    {
                      teacher?.map((data, i)=>(
                        <option key={i} value={data?.idprofesor} >{data?.nombre} {data?.apellido}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="Lend-Teacher-Free-Div"  >
                  <label>Salon</label>
                  <input type="text" />
                  <select name="salon" onChange={(e)=> changerData(e)} >
                    {
                      salon?.map((data, i)=>(
                        <option key={i} value={data?.programa} >{data?.programa}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="Lend-Teacher-Free-Changer">
                <select onChange={(e)=>changerOptions(e)} >
                  <option value={1} >libre</option>
                  <option value={0} >clase</option>
                </select>
                </div>
              </div>
            </div>
            <div className="Lend-Student-Active" style={classs.idsalon? {} : {display: "none"}} >
              <div className="Lend-Student-Bar" >
                <h2 style={{color: "transparent"}} ><HiTrash/></h2>
                <h3>Clase & Profesor</h3>
                <h2 onClick={()=> deleteClass()} ><HiTrash /></h2>
              </div>
              <div className="Lend-Student-Card" >
                <picture>
                  <img src="https://cdn-icons-png.flaticon.com/512/5609/5609505.png" />
                </picture>
                <h3>{classs?.programa}</h3>
                <p>{classs?.nombre} {classs?.apellido}</p>
              </div>
            </div>
          </div> 
          <div className="Lend-Student" >
            <div className="Lend-Ingrese-Studente" style={apiStudent.idestudiante? {display: "none"} : {}} >
              <input type="text" placeholder="id del estudiante" autoFocus name="idestudiante" onChange={(e)=> changerStudent(e)} onKeyDown={(e)=>{if (e.key === "Enter"){
                toast.promise(handleStudent(),{
                  success: "estudiante agregado",
                  loading: "buscando estudiante...",
                  error: (e)=> e
                });
              }}} />
              <button onClick={()=> toast.promise(handleStudent(),{
                success: "estudiante agregado",
                loading: "buscando estudiante",
                error: (e) => e
              })} >Ingresar</button>
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
          <div className="Lend-item-Plus" style={item.iditem? {display: "none"} : {}} onClick={()=> navigate("/gestion/prestamo/selecionar")} >
            <picture>
              <img src="http://localhost:8000/upload/predefault/mas.png" />
            </picture> 
          </div>
          <div className="Lend-Item-Select" style={item.iditem? {} : {display: "none"}} >
            <div><h2 style={{color: "transparent"}} >x</h2><p>item a prestar</p><h2 onClick={()=> deleteItem()} ><HiTrash/></h2></div> 
            <picture>
              <img src={item?.imagen} />
            </picture>
            <h3>{item?.nombre}</h3>
          </div>
        </div>
        <div className="Lend-ButtonSubmit" >
          <button onClick={()=> toast.promise(handleLend(),{
            loading: "realizando el prestamo...",
            success: "Prestamo realizado",
            error: (e) => e
          })} >Prestar</button>
        </div>
      </div>
    </div>
  );
}
