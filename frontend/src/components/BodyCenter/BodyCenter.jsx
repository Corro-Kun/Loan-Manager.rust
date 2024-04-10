import Body from "./../Body/Body";
import "./BodyCenter.css";

export default function BodyCenter({children}){
  return(
    <Body>
      <div className="Center" >
        {children}
      </div>
    </Body> 
  );
}
