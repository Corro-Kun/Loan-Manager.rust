import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { postLogin, getProfile } from "../api/api";

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
    const data = await postLogin(login);
    if (data.error){
      throw new Error(data.error);
    }
    localStorage.setItem("idBosque", data.id);
    navigate("/redirect");
  }

  const [profile, setProfile] = useState();

  async function GetProfile(){
    const data = await getProfile();
    setProfile(data);
  }
  
  return(
    <ProfileContext.Provider value={{ChangerLogin, HandleLogin, profile ,GetProfile}} >
      {children}
    </ProfileContext.Provider>
  );
}
