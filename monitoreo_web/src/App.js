
import './App.css';
import Head from './components/header/Head';
import {Route, BrowserRouter as Router} from "react-router-dom";
import home from './components/home/home';
import ManageExer from './components/ejercicios/ManageExer'; //Ejercicio
import MenuRutina from './components/rutinas/MenuRutina'; //Rutinas

function App() {


  return (
    <div className="App">
      <Head />
      <Router>

        <Route path="/" exact component={home}/>
        <Route path="/Manageexer" component={ManageExer}/>
        <Route path="/MenuRutina" component={MenuRutina}/>
      </Router>
      hi
    </div>
  );
}

export default App;
