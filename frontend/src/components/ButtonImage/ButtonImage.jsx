import "./ButtonImage.css";
import {useNavigate} from "react-router-dom";

export default function ButtonImage({image, path, title}){
  const navigate = useNavigate();

  return(
    <div className="ButtonImage-Div" onClick={()=>navigate(path)} title={title} >
      <picture>
        <img src={image} />
      </picture>
    </div>
  );
}
