import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./page/login";
import Redirect from "./page/redirect";
import RolAdmin from "./security/rolAdmin";
import RolPrestamista from "./security/rolPrestamista"; 
import Admin from "./page/admin.jsx";
import CreateUser from "./page/createUser.jsx";
import ListAdmin from "./page/listAdmin.jsx";
import {Toaster} from "sonner";
import CreateItem from "./page/createItem.jsx";
import Prestamista from "./page/prestamista.jsx";
import CreateStudent from "./page/createStudent.jsx";
import LendPage from "./page/LendPage.jsx";
import SelectItemPage from "./page/SelectItemPage.jsx";
import HistorePage from "./page/HistorePage.jsx";

function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        {/* Admin */}
        <Route element={<RolAdmin />} >
          <Route path="/admin" element={<Admin />} />
          <Route path="/new/user" element={<CreateUser />} />
          <Route path="/new/item" element={<CreateItem />} />
          <Route path="/new/student" element={<CreateStudent />} />
          <Route path="/list/some" element={<ListAdmin />} />
        </Route>
        {/* Prestamista */}
        <Route element={<RolPrestamista />} > 
          <Route path="/prestamista" element={<Prestamista />} />
          <Route path="/gestion/prestamo" element={<LendPage />} />
          <Route path="/gestion/prestamo/selecionar" element={<SelectItemPage />} />
          <Route path="/historial" element={<HistorePage />} />
        </Route>
      </Routes> 
    </BrowserRouter>
    <Toaster
        toastOptions={{style:{backgroundColor: "var(--Body_Color)",color: "var(--Text_Color)", boxShadow: "0 0 20px rgba(0, 0, 0, .2)", border: "1px solid var(--Main_Color)"}}}
    />
    </> 
  );
}

export default App
