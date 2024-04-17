import Body from "../components/Body/Body";
import BodyMain from "../components/BodyMain/BodyMain.jsx"
import CardProfile from "../components/CardProfile/CardProfile.jsx";
import ButtonImage from "../components/ButtonImage/ButtonImage.jsx";
import PanelMain from "../components/PanelMain/PanelMain.jsx";
import {ProfileProvider} from "../context/profile.jsx";

function Admin(){
  return(
    <Body>
      <BodyMain>
        <ProfileProvider>
          <CardProfile />
        </ProfileProvider>
        <PanelMain>
          <ButtonImage image={"http://localhost:8000/upload/predefault/crearusuario.png"} title={"Crear usuario"} path={"/new/user"} /> 
          <ButtonImage image={"http://localhost:8000/upload/predefault/crearobjeto.png"} title={"Crear un objeto"} path={"/new/item"} />
          <ButtonImage image={"http://localhost:8000/upload/predefault/crearestudiante.png"} title={"Crear estudiante"} path={"/new/student"} /> 
          {
            //<ButtonImage image={"http://localhost:8000/upload/predefault/lista.png"} title={"Lista general"} path={"/list/some"} />
          }
          <ButtonImage image={"http://localhost:8000/upload/predefault/gestionclase.png"} title={"gestion de clase"} path={""} />
        </PanelMain>      
      </BodyMain>

    </Body>
  );
}

export default Admin;

