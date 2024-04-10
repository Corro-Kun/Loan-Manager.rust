import BodyCenter from "../components/BodyCenter/BodyCenter";
import ListAvaliable from "../components/ListAvailable/ListAvailable";
import { ProviderLend } from "../context/lend";

function SelectItemPage(){
  return(
    <BodyCenter>
      <ProviderLend>
        <ListAvaliable />
      </ProviderLend>
    </BodyCenter> 
  );
}

export default SelectItemPage;
