import {createContext, useContext, useState} from "react";
import { getClassComplet, getStudentById } from "../api/api";

const ContextLend  = createContext();

export const useLend = ()=>{
  return useContext(ContextLend);
}

export function ProviderLend({children}){
  const [student, setStudent] = useState({});
  const [apiStudent, setApiStudent] = useState({});

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
  }

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

  return(
    <ContextLend.Provider value={{changerStudent, handleStudent, apiStudent, deleteStudent, getStudentSave, changerClass, handleClass, classs, hidenClass, deleteClass}} >
      {children}
    </ContextLend.Provider>
  );
}

  
