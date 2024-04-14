import BodyCenter from "./../components/BodyCenter/BodyCenter";
import ReturnDash from "../components/ReturnDash/ReturnDash";
import {ProviderReturnLend} from "../context/returnLend";

function Return(){
  return(
    <BodyCenter>
      <ProviderReturnLend>
        <ReturnDash />
      </ProviderReturnLend>
    </BodyCenter>
  );
}

export default Return;
