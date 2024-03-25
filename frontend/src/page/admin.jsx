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
          <ButtonImage image={"https://cdn-icons-png.flaticon.com/256/11911/11911131.png"} /> 
          <ButtonImage image={"https://cdn-icons-png.freepik.com/512/10608/10608883.png"} />
          <ButtonImage image={"https://cdn.icon-icons.com/icons2/1128/PNG/512/1486164728-118_79708.png"} />
        </PanelMain>      
      </BodyMain>

    </Body>
  );
}

export default Admin;

