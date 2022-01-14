import './header-Prof/HeadProf.css';
import HeadProf from './header-Prof/HeadProf'
import {Route, BrowserRouter as Router} from "react-router-dom";
import createProf from './createProf' //crear
import viewprof from './viewProf'; //ver


const MenuProf = (props) => {


  return (
    <div className="MenuProf">
      <Router>

        <Route path="/MenuProf" exact component={HeadProf} id_mayor={props.id_mayor}/>
        <Route path="/MenuProf/CrearProf" component={createProf} id_mayor={props.id_mayor}/> 
        <Route path="/MenuProf/VerProf" component={viewprof} id_mayor={props.id_mayor}/>
      </Router>
      hi
    </div>
  );
}

export default MenuProf;
