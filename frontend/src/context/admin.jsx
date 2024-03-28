import {useContext, createContext, useState} from "react";
import {postCreateUser} from "../api/api.js";

const ContextAdmin = createContext();

export function useAdmin(){
  return useContext(ContextAdmin);
}

export function ProviderAdmin({children}){
  const [usuario, setUsuario] = useState({});

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
    await postCreateUser(form);
  }

  return(
    <ContextAdmin.Provider value={{changerUsuario, handleUsuario}} >
      {children}
    </ContextAdmin.Provider>
  );
}
