import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./page/login";
import Redirect from "./page/redirect";
import RolAdmin from "./security/rolAdmin";
import RolPrestamista from "./security/rolPrestamista"; 
import Admin from "./page/admin.jsx";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        {/* Admin */}
        <Route element={<RolAdmin />} >
          <Route path="/admin" element={<Admin />} />
        </Route>
        {/* Prestamista */}
        <Route element={<RolPrestamista />} > 
          <Route path="/prestamista" element={<h2>Prestamista</h2>} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App
