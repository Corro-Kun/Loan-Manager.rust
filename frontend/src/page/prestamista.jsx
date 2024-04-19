import Body from "../components/Body/Body";
import BodyMain from "../components/BodyMain/BodyMain"; 
import ButtonImage from "../components/ButtonImage/ButtonImage.jsx";
import CardProfile from "../components/CardProfile/CardProfile";
import PanelMain from "../components/PanelMain/PanelMain.jsx";
import {ProfileProvider} from "../context/profile.jsx";
import CloseSession from "../components/CloseSession/CloseSession.jsx";
import {IMAGES} from "../CONSTANS.js";

function Prestamista(){
  return(
    <Body>
      <BodyMain>
        <ProfileProvider>
          <CardProfile />
        </ProfileProvider>
        <PanelMain>
          <ButtonImage image={`${IMAGES}/upload/predefault/prestar.png`} title={"Prestar"} path={"/gestion/prestamo"}  />
          <ButtonImage image={`${IMAGES}/upload/predefault/devolver.png`} title={"Devolver"} path={"/gestion/devolver"} />
          <ButtonImage image={`${IMAGES}/upload/predefault/historial.png`} title={"Historias"} path={"/historial"} />
        </PanelMain>
      </BodyMain>
      <CloseSession />
    </Body> 
  );
}

export default Prestamista
