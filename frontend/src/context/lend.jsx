import {createContext, useContext, useState} from "react";
import { getStudentById } from "../api/api";

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
    if (!student.idestudiante && student.idestudiante.length >=1){
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
  }

  return(
    <ContextLend.Provider value={{changerStudent, handleStudent, apiStudent, deleteStudent, getStudentSave}} >
      {children}
    </ContextLend.Provider>
  );
}

  
