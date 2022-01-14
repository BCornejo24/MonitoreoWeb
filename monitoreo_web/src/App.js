
import './App.css';
import Head from './components/header/Head';
import {Route, BrowserRouter as Router} from "react-router-dom";
import home from './components/home/home';
import ManageExer from './components/ejercicios/ManageExer'; //Ejercicio
import MenuRutina from './components/rutinas/MenuRutina'; //Rutinas
import MenuUser from './components/usuarios/MenuUser';

const App = (props) => {


  return (
    <div className="App">
      <Head />
      <Router>

        <Route path="/" exact     component={home}       id_mayor={props.id_mayor}/>
        <Route path="/Manageexer" component={ManageExer} id_mayor={props.id_mayor}/>
        <Route path="/MenuRutina" component={MenuRutina} id_mayor={props.id_mayor}/>
        <Route path="/MenuUser" component={MenuUser}  id_mayor={props.idmayor}/>

      </Router>
      hi
    </div>
  );
}

export default App;
