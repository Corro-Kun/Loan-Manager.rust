import Body from "../components/Body/Body.jsx";
import NewUser from "../components/NewUser/NewUser.jsx";
import {ProviderAdmin} from "../context/admin.jsx";

function CreateUser(){
  return(
    <Body>
      <ProviderAdmin>
        <NewUser />
      </ProviderAdmin>
    </Body>
  );
}

export default CreateUser;
