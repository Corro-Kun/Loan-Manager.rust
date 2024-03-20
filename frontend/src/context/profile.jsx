import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { postLogin } from "../api/api";

export const ProfileContext = createContext();

export function useProfile(){
  return useContext(ProfileContext);
}

export function ProfileProvider({children}){
  const navigate = useNavigate();

  const [login, setLogin] = useState({});

  function ChangerLogin({target:{name, value}}){
    setLogin({...login,[name]: value});
  }

  async function HandleLogin(e){
    e.preventDefault();
    const {id} = await postLogin(login);
    localStorage.setItem("idBosque", id);
    navigate("/redirect");
  }
  
  return(
    <ProfileContext.Provider value={{ChangerLogin, HandleLogin}} >
      {children}
    </ProfileContext.Provider>
  );
}
