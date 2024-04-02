import {useContext, createContext, useState} from "react";
import {postCreateUser, postCreateItem} from "../api/api.js";
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

  function changerCreation({target:{value}}){
    if (value === "0"){
      setProfesor(false);
    }else {
      setProfesor(true);
    }
  }

  return(
    <ContextAdmin.Provider value={{changerUsuario, handleUsuario, handleItem, changerItem, ImageDownload, changerCreation, profesor}} >
      {children}
    </ContextAdmin.Provider>
  );
}
