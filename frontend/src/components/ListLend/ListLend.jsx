import {useEffect} from "react";
import {useReturnLend} from "../../context/returnLend";
import { IMAGES } from "../../CONSTANS";

export default function ListLend(){
  const {getItem, item, searchItem, saveItem} = useReturnLend();

  useEffect(()=>{
    getItem();
  },[]);

  return(
    <div className="ListAvaliable-Div" >
      <div className="ListAvaliable-Input" >
        <input type="text" placeholder="id" onChange={(e)=> searchItem(e)} />
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
