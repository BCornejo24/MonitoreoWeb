
import './App.css';
import Head from './components/header/Head';
import {Route, BrowserRouter as Router} from "react-router-dom";
import home from './components/home/home';
import ManageExer from './components/ejercicios/ManageExer';
import ManageRutin from './components/rutinas/ManageRutin';

function App() {


  return (
    <div className="App">
      <Head />
      <Router>

        <Route path="/" exact component={home}/>
        <Route path="/Manageexer" component={ManageExer}/>
        <Route path="/ManageRutin" component={ManageRutin}/>
      </Router>
      hi
    </div>
  );
}

export default App;
