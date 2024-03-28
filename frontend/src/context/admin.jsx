import {useContext, createContext, useState} from "react";

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

  function handleUsuario(e){
    e.preventDefault();
    console.log(usuario);
  }

  return(
    <ContextAdmin.Provider value={{changerUsuario, handleUsuario}} >
      {children}
    </ContextAdmin.Provider>
  );
}
