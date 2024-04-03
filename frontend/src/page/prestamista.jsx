import Body from "../components/Body/Body";
import BodyMain from "../components/BodyMain/BodyMain"; 
import CardProfile from "../components/CardProfile/CardProfile";
import {ProfileProvider} from "../context/profile.jsx";

function Prestamista(){
  return(
    <Body>
      <BodyMain>
        <ProfileProvider>
          <CardProfile />
        </ProfileProvider>
      </BodyMain>
    </Body> 
  );
}

export default Prestamista
