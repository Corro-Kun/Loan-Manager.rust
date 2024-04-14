import BodyCenter from "../components/BodyCenter/BodyCenter";
import ListLend from "../components/ListLend/ListLend";
import {ProviderReturnLend} from "../context/returnLend";

function SelectItemReturn(){
  return(
    <BodyCenter>
      <ProviderReturnLend>
        <ListLend />
      </ProviderReturnLend>
    </BodyCenter>
  );
}

export default SelectItemReturn;
