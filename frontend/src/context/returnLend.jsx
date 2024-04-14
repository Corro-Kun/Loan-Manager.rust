import {useContext, createContext, useState} from "react";
import {putLend, getLendAll} from "../api/api.js";
import {useNavigate} from "react-router-dom";

const ContextReturn = createContext();

export function useReturnLend(){
  return useContext(ContextReturn);
}

export function ProviderReturnLend({children}){
  const navigate = useNavigate();

  const [item, setItem] = useState([]);

  async function getItem(){
    const data = await getLendAll();
    if(data.error){
      throw new Error(data.error); 
    }
    console.log(data);
    setItem(data);
  }

  function saveItem(i){
    localStorage.setItem("itemLend", JSON.stringify(item[i]));
    navigate("/gestion/devolver");
  }

  function searchItem({target:{value}}){
    if(value.length === 0){
      getItem();
    }else{
      let cache = item.filter((i)=> i.iditem.includes(value));
      setItem(cache);
    }
  }

  const [itemR, setItemR] = useState({});

  function getData(){
    let data = localStorage.getItem("itemLend");
    if (data){
      data = JSON.parse(data);
      setItemR(data);
    }
  }

  function quiteReturn(){
    localStorage.removeItem("itemLend");
    navigate("/prestamista");
  }

  return(
    <ContextReturn.Provider value={{getItem, item, searchItem, saveItem, itemR, getData, quiteReturn}} >
      {children}
    </ContextReturn.Provider>
  );
}
