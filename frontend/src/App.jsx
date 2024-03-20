import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./page/login";
import Redirect from "./page/redirect";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/admin" element={<h2>Hola</h2>} />
        <Route path="/prestamista" element={<h2>Hola</h2>} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App
