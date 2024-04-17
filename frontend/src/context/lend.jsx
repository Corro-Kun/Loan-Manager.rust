import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import { getClassComplet, getStudentById, getItemsNotLend, postLend, getTeacher, getSalon } from "../api/api";

const ContextLend  = createContext();

export const useLend = ()=>{
  return useContext(ContextLend);
}

export function ProviderLend({children}){
  const [student, setStudent] = useState({});
  const [apiStudent, setApiStudent] = useState({});
  const navigate = useNavigate();

  function changerStudent({target:{name, value}}){
    setStudent({...student, [name]: value});
  }

  async function handleStudent(){
    if (student.idestudiante === undefined){
      throw new Error("No hay id del estudiante");
    }
    const data = await getStudentById(student.idestudiante);

    if (data.error){
      throw new Error(data.error);
    }
    
    setApiStudent(data);
    localStorage.setItem("student", JSON.stringify(data));
  }

  function deleteStudent(){
    localStorage.removeItem("student");
    setApiStudent({});
  }

  function getStudentSave(){
    let data = localStorage.getItem("student");
    if(data){
      data = JSON.parse(data);
      setApiStudent(data);
    }
    data = localStorage.getItem("class");
    if(data){
      data = JSON.parse(data);
      setClasss(data);
      setHidenClass(false);
    }
    data = localStorage.getItem("item");
    if(data){
      data = JSON.parse(data);
      setItem(data);
    }
  }

  const [item, setItem] = useState({});

  const [idclase, setIdclase] = useState({});

  function changerClass({target:{name, value}}){
    setIdclase({...idclase, [name]: value});
  }

  const [classs, setClasss] = useState({});
  const [hidenClass, setHidenClass] = useState(true);

  async function handleClass(){
    if (idclase.idclase === undefined){
      throw new Error("No hay id de la clase");
    }
    const data = await getClassComplet(idclase.idclase);

    if (data.error){
      throw new Error(data.error);
    }

    setClasss(data);
    setHidenClass(false);
    localStorage.setItem("class", JSON.stringify(data));
  }

  function deleteClass(){
    localStorage.removeItem("class");
    setHidenClass(true);
    setClasss({});
  }

  const [items, setItems] = useState([]);

  async function getItems(){
    const data = await getItemsNotLend();
    setItems(data);
  }

  function saveItem(i){
    localStorage.setItem("item", JSON.stringify(items[i])); 
    toast.success("Item agregado");
    navigate("/gestion/prestamo");
  }

  function searchItem({target:{value}}){
    let a = "";
    a.length
    if (value.length >= 1){
      let cache = items.filter((i)=> i.iditem.includes(value))
      setItems(cache);
    }else{
      getItems();
    }
  }

  function deleteItem(){
    localStorage.removeItem("item");
    setItem({});
  }

  function deleteAll(){
    deleteClass();
    deleteStudent();
    deleteItem();
    toast.success("Operación cancelada");
    navigate("/prestamista");
  }


  async function handleLend(){
    if(item.iditem === undefined){
      throw new Error("No hay item");
    }else if(apiStudent.idestudiante === undefined){
      throw new Error("No hay estudiante");
    }

    if(free){
      if(dataExtra.salon === undefined && dataExtra.profesor === undefined){
        throw new Error("No hay selecionado todas las opciones");
      }
      let data = {
        "iditem": item.iditem,
        "idsalon": dataExtra.salon,
        "idprofesor": dataExtra.profesor,
        "idestudiante": apiStudent.idestudiante
      }

      data = await postLend(data);
      if (data.error){
        throw new Error(data.error);
      }
    }else{
      if(classs.idsalon === undefined){
        throw new Error("No hay salon");
      };

      let data = {
        "iditem": item.iditem,
        "idsalon": classs.idsalon,
        "idprofesor": classs.idprofesor,
        "idestudiante": apiStudent.idestudiante
      }

      data = await postLend(data);
      if (data.error){
        throw new Error(data.error);
      }
    }

    deleteClass();
    deleteStudent();
    deleteItem();

    navigate("/prestamista");
  }

  const [free, setFree] = useState(false);

  function changerOptions({target:{value}}){
    if (value === "0"){
      setFree(false);
    }else{
      setFree(true);
      getAllTeacher();
      getAllClass();
    }
  }

  const [teacher, setTeacher] = useState([]);

  async function getAllTeacher(){
    const data = await getTeacher();
    setTeacher(data);
  }

  const [salon, setSalon] = useState([]);

  async function getAllClass(){
    const data = await getSalon();
    setSalon(data);
  }

  const [dataExtra, setDataExtra] = useState({});

  async function changerData({target:{name, value}}){
    setDataExtra({...dataExtra, [name]: value});
  }

  return(
    <ContextLend.Provider value={{changerStudent, handleStudent, apiStudent, deleteStudent, getStudentSave, changerClass, handleClass, classs, hidenClass, deleteClass, items, getItems, searchItem, saveItem, item, deleteItem, deleteAll, handleLend, free, changerOptions, teacher, salon, changerData}} >
      {children}
    </ContextLend.Provider>
  );
}

  
