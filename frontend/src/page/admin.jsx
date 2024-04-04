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
          <ButtonImage image={"https://cdn-icons-png.flaticon.com/256/11911/11911131.png"} title={"Crear usuario"} path={"/new/user"} /> 
          <ButtonImage image={"https://cdn-icons-png.freepik.com/512/10608/10608883.png"} title={"Crear un objeto"} path={"/new/item"} />
          <ButtonImage image={"https://images.vexels.com/media/users/3/266399/isolated/preview/7f0454c2c581180d5c18afce67709b48-nia-a-estudiante-libro-nia-os.png"} title={"Crear estudiante"} path={"/new/student"} /> 
          <ButtonImage image={"https://cdn.icon-icons.com/icons2/1128/PNG/512/1486164728-118_79708.png"} title={"Lista general"} path={"/list/some"} />
        </PanelMain>      
      </BodyMain>

    </Body>
  );
}

export default Admin;

