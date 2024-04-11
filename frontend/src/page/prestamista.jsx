import Body from "../components/Body/Body";
import BodyMain from "../components/BodyMain/BodyMain"; 
import ButtonImage from "../components/ButtonImage/ButtonImage.jsx";
import CardProfile from "../components/CardProfile/CardProfile";
import PanelMain from "../components/PanelMain/PanelMain.jsx";
import {ProfileProvider} from "../context/profile.jsx";

function Prestamista(){
  return(
    <Body>
      <BodyMain>
        <ProfileProvider>
          <CardProfile />
        </ProfileProvider>
        <PanelMain>
          <ButtonImage image={"https://cdn-icons-png.flaticon.com/512/15334/15334547.png"} title={"Prestar"} path={"/gestion/prestamo"}  />
          <ButtonImage image={"https://cdn-icons-png.flaticon.com/512/1440/1440524.png"} title={"Devolver"} />
          <ButtonImage image={"https://cdn-icons-png.flaticon.com/512/1584/1584831.png"} title={"Historias"} path={"/historial"} />
        </PanelMain>
      </BodyMain>
    </Body> 
  );
}

export default Prestamista
