import Body from "../components/Body/Body";
import FormItem from "../components/FormItem/FormItem";
import {ProviderAdmin} from "../context/admin.jsx";

function CreateItem(){
  return(
    <Body>
      <ProviderAdmin>
        <FormItem />
      </ProviderAdmin>
    </Body>
  );
}

export default CreateItem;
