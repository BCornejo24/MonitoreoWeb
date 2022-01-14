import './header-Rutinas/HeadRutinas.css';
import HeadRutinas from './header-Rutinas/HeadRutinas';
import {Route, BrowserRouter as Router} from "react-router-dom";
import CrearRutina from './CrearRutina'; //crear
import ManageRutin from './ManageRutin'; //ver


const MenuRutinas = (props) => {


  return (
    <div className="MenuRutinas">
      <Router>

        <Route path="/MenuRutina" exact component={HeadRutinas} id_mayor={props.id_mayor}/>
        <Route path="/MenuRutina/CrearRutina" component={CrearRutina} id_mayor={props.id_mayor}/> 
        <Route path="/MenuRutina/ManageRutin" component={ManageRutin} id_mayor={props.id_mayor}/>
      </Router>
      hi
    </div>
  );
}

export default MenuRutinas;
