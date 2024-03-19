import {useContext, createContext, useState} from "react";
import { postLogin } from "../api/api";

export const ProfileContext = createContext();

export function useProfile(){
  return useContext(ProfileContext);
}

export function ProfileProvider({children}){
  const [login, setLogin] = useState({});

  function ChangerLogin({target:{name, value}}){
    setLogin({...login,[name]: value});
  }

  async function HandleLogin(e){
    e.preventDefault();
    await postLogin(login);
  }
  
  return(
    <ProfileContext.Provider value={{ChangerLogin, HandleLogin}} >
      {children}
    </ProfileContext.Provider>
  );
}
