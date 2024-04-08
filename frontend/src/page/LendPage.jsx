import Body from "../components/Body/Body";
import Lend from "../components/Lend/Lend";
import { ProviderLend } from "../context/lend";

function LendPage(){
  return(
    <Body>
      <ProviderLend>
        <Lend />
      </ProviderLend>
    </Body>
  );
}

export default LendPage;
