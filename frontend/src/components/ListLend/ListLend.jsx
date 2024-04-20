import {useEffect} from "react";
import {useReturnLend} from "../../context/returnLend";
import { IMAGES } from "../../CONSTANS";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";


export default function ListLend(){
  const {getItem, item, searchItem, saveItem} = useReturnLend();
  const navegate = useNavigate();

  useEffect(()=>{
    getItem();
  },[]);

  return(
    <div className="ListAvaliable-Div" >
      <div className="ListAvaliable-Input" >
        <h2></h2>
        <input type="text" placeholder="id" onChange={(e)=> searchItem(e)} />
        <h2 onClick={()=> navegate("/gestion/devolver")} ><FaArrowRightFromBracket /></h2>
      </div>
      <div className="ListAvaliable-Content" >
        {
          item.map((data, i)=>(
            <div key={i} className="ListAvaliable-Card" onClick={()=> saveItem(i)} >
              <picture>
                <img src={`${IMAGES}${data?.imagen}`} />
              </picture>
              <p>{data?.iditem}</p>
              <h3>{data?.nombre}</h3>
            </div>
          ))
        }
     </div>
    </div> 
  );
}
