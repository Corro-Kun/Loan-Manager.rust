import "./CardAdmin.css";

export default function CardAdmin(){
  return(
    <div className="CardAdmin-Div" >
      <picture>
        <img src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0a1d54317165b653/5fa1f080f9cf41781dad68fa/6660_Tank_T2_BamisCinder.png" />
      </picture>
      <h3>id</h3>
      <div>
        <button>Eliminar</button> 
        <button>Modificar</button>
      </div>
    </div>
  );
}
