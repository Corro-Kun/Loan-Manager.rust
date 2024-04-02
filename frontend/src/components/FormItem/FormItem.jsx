import {useRef, useEffect, useState} from "react";
import "./FormItem.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import {useAdmin} from "../../context/admin.jsx";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

export default function FormItem(){
  const {changerItem, handleItem, ImageDownload} = useAdmin();
  const inputImg = useRef(null);
  const images = ["http://localhost:8000/upload/predefault/llaves.png", "http://localhost:8000/upload/predefault/proyector.png", "http://localhost:8000/upload/predefault/laptop.png"];
  const [image, setImage] = useState(images[0]);
  const [index, setIndex] = useState(0);
  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    ImageDownload(images[0]);
  }, []);

  return(
    <div className="FormItem-Render-Div" >
      <form className="FormItem-Div" onSubmit={(e)=> toast.promise(handleItem(e),{
        loading: "Creando item...",
        success: "Item creado",
        error: (err) => err,  
      })} >
        <div className="FormItem-H2" >
          <h2>Crear un item</h2>
        </div>
        <div className="FormItem-Div-Picture" >
          <button type="button" onClick={()=>{
            let cache = images.length-1;
            if (index !== 0){
              cache = index - 1;
            }
            setAnimation(true);
            ImageDownload(images[cache]);

            setTimeout(()=>{
              setImage(images[cache]);
              setAnimation(false);
              setIndex(cache);
            }, 200);

          }} ><FaLongArrowAltLeft /></button>
          <picture onClick={()=> inputImg.current.click()} className={animation? "FormItem-Picture-Animation" : ""} >
            <img src={image} />
          </picture>
          <input accept="image/*" style={{display: "none"}} type="file" name="file" ref={inputImg} onChange={(e)=> {
            changerItem(e)
            setImage(URL.createObjectURL(e.target.files[0]));
          }} />
          <button type="button" onClick={()=>{
            let cache = 0;
            if (index !== images.length-1){
              cache = index + 1;
            }
            setAnimation(true);
            ImageDownload(images[cache]);

            setTimeout(()=>{
              setImage(images[cache]);
              setAnimation(false);
              setIndex(cache);
            }, 200);
          }} ><FaLongArrowAltRight /></button>
        </div>
        <div className="FormItem-Div-Form" >
          <div>
            <label>Id</label>
            <input name="iditem" type="text" required onChange={(e)=> changerItem(e)} />
          </div>
          <div>
            <label>Nombre</label>
            <input name="nombre" type="text" required onChange={(e)=> changerItem(e)} />
          </div>
          <div>
            <label>Descripción</label>
            <textarea name="descripcion" required onChange={(e)=> changerItem(e)} />
          </div>
        </div>
        <div className="FormItem-Div-Button" >
          <button type="submit" >Crear</button>
          <button type="button" onClick={()=> navigate("/admin")} >Cancelar</button>
        </div>
      </form>
    </div>
  );
}
