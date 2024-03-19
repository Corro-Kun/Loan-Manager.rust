import Body from "../components/Body/Body.jsx";
import LoginRegister from "../components/LoginRegister/LoginRegister.jsx"; 
import { ProfileProvider } from "../context/profile.jsx";

function Login(){
  return(
    <Body>
      <ProfileProvider>
        <LoginRegister />
      </ProfileProvider>
    </Body>
  );
}

export default Login
