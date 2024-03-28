import {useContext, createContext} from "react";

const ContextAdmin = createContext();

export function useAdmin(){
  return useContext(ContextAdmin);
}

export function ProviderAdmin({children}){
  return(
    <ContextAdmin.Provider value={{}} >
      {children}
    </ContextAdmin.Provider>
  );
}
