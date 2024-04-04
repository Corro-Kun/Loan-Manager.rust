import {useContext, createContext, useState} from "react";
import {postCreateUser, postCreateItem, postCreateClass, getClassEmpty, postTeacher, postTeacherWithClass, postStudent} from "../api/api.js";
import {useNavigate} from "react-router-dom";

const ContextAdmin = createContext();

export function useAdmin(){
  return useContext(ContextAdmin);
}

export function ProviderAdmin({children}){
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  function changerUsuario({target:{name, value, files}}){
    if(name === "file"){
      const [file] = files;
      setUsuario({...usuario, [name]: file});
    }else{
      setUsuario({...usuario,[name]: value});
    }
  }

  async function handleUsuario(e){
    e.preventDefault();
    if (!profesor){
      const form = new FormData();
      form.append("idusuario", usuario.idusuario);
      form.append("nombre", usuario.nombre);
      form.append("apellido", usuario.apellido);
      form.append("rol", 2);
      form.append("contraseña", usuario.contraseña);
      form.append("file", usuario.file);
      const data = await postCreateUser(form);
      if(data.error){
        throw new Error(data.error);
      }
      navigate("/admin");
    }else{
      let cache = {
        idprofesor: usuario.idusuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      }
      const data = await postTeacher(cache);
      if(data.error){
        throw new Error(data.error);
      }

      if(usuario.idsalon){
        console.log("entro");
        let send ={
          idprofesor: usuario.idusuario,
          idsalon: usuario.idsalon
        }
        const data2 = await postTeacherWithClass(send);
        if(data2.error){
          throw new Error(data.error);
        }
      }
      
      navigate("/admin");
    }
 }

  const [item, setItem] = useState({});

  function changerItem({target:{name, value, files}}){
    if(name === "file"){
      const [file] = files;
      setItem({...item, [name]: file});
    }else{
      setItem({...item, [name]: value});
    }
  }

  async function handleItem(e){
    e.preventDefault();
    const form = new FormData();
    form.append("iditem", item.iditem);
    form.append("nombre", item.nombre);
    form.append("descripcion", item.descripcion);
    form.append("file", item.file);
    const data = await postCreateItem(form);
    if(data.error){
      throw new Error(data.error);
    }
    navigate("/admin");
  }

  async function ImageDownload(url){
    const response = await fetch(url);
    const blob = await response.blob();

    const archivo = new File([blob], 'llaves.png', { type: blob.type });
    setItem({...item, file: archivo});
  }

  const [profesor, setProfesor] = useState(false);

  async function changerCreation({target:{value}}){
    if (value === "0"){
      setProfesor(false);
    }else {
      setProfesor(true);
      await getClassEmp();
    }
  }

  const [classs, setClasss] = useState({
    idsalon: "",
    programa: "",
    idprofesor: "",
  });

  function changerClass({target:{value, name}}){
    setClasss({...classs,[name]: value});
  }

  async function HandleClass(){
    if(classs.idsalon.length < 2){
      throw new Error("el id es muy corto");
    }else if(classs.programa.length < 2){
      throw new Error("El programa es muy corto");
    }
    
    const data = await postCreateClass(classs);

    if(data.error){
      throw new Error(data.error);
    }

    await getClassEmp();
  }

  const [classEmpty, setClassEmpty] = useState([]);

  async function getClassEmp(){
    const data = await getClassEmpty();
    data.map((data)=> data.select = false);
    setClassEmpty(data);
  }

  function addClass(id, i){
    let cache = classEmpty;
    cache.map((data)=> data.select = false);
    cache[i].select = true;
    setClassEmpty(cache);
    setUsuario({...usuario, idsalon: id});
  }

  async function handleStudent(e){
    e.preventDefault();
    const data = await postStudent(usuario);
    
    if(data.error){
      throw new Error(data.error);
    }

    navigate("/admin");
  }

  return(
    <ContextAdmin.Provider value={{changerUsuario, handleUsuario, handleItem, changerItem, ImageDownload, changerCreation, profesor, changerClass, HandleClass, classEmpty, addClass, handleStudent}} >
      {children}
    </ContextAdmin.Provider>
  );
}
