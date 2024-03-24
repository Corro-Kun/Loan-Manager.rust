import "./ButtonImage.css";
import {useNavigate} from "react-router-dom";

export default function ButtonImage({image, path}){
  const navigate = useNavigate();

  return(
    <div className="ButtonImage-Div" onClick={()=>navigate(path)} >
      <picture>
        <img src={image} />
      </picture>
    </div>
  );
}
