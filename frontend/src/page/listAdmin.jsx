import Body from "../components/Body/Body.jsx";
import BodyList from "../components/BodyList/BodyList.jsx";
import BarListAdmin from "../components/BarListAdmin/BarListAdmin.jsx";

function ListAdmin(){
  return(
    <Body>
      <BarListAdmin />
      <BodyList />
    </Body>
  );
}

export default ListAdmin;
