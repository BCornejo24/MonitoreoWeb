import './header-Rutinas/HeadRutinas.css';
import HeadRutinas from './header-Rutinas/HeadRutinas';
import {Route, BrowserRouter as Router} from "react-router-dom";
import CrearRutina from './CrearRutina'; //crear
import ManageRutin from './ManageRutin'; //ver


function MenuRutinas() {


  return (
    <div className="MenuRutinas">
      <Router>

        <Route path="/MenuRutina" exact component={HeadRutinas}/>
        <Route path="/MenuRutina/CrearRutina" component={CrearRutina}/> 
        <Route path="/MenuRutina/ManageRutin" component={ManageRutin}/>
      </Router>
      hi
    </div>
  );
}

export default MenuRutinas;
