import Body from "../components/Body/Body";
import NewStudent from "../components/newStudent/newStudent";
import { ProviderAdmin } from "../context/admin";

function CreateStudent(){
  return(
    <Body>
      <ProviderAdmin>
        <NewStudent />
      </ProviderAdmin>
    </Body>
  );
}

export default CreateStudent;
