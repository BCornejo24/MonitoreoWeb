
import './App.css';

// import {Route,  Routes} from "react-router-dom";
// //import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { db } from './firebase-config';

 import ProfDashboard from './components/Comun/Dashboards/ProfDashboard';
 import AdmDashboard from './components/Comun/Dashboards/AdmDashboard';
 import MCDashboard from './components/Comun/Dashboards/MCDashboard';

 import Cookies from 'universal-cookie';
 import { useEffect, useState } from 'react';

import BarContainer from './components/Comun/Sidebar/BarContainer';

import LogIn from './components/Comun/LogIn';
// import BarraLat from './components/Comun/Sidebar/ADM/BarraLat';
// import MenuEjercicios from './components/Ejercicios/MenuEjercicios';
// import MenuAlumno from './components/Alumno/MenuAlumno';
// import MenuProfesor from './components/Profesor/MenuProfesor';
// import MenuRutina from './components/Rutina/MenuRutina';
// import MenuManagerColegio from './components/ManagerColegio/MenuManagerColegio';
// import MenuUsuario from './components/Usuario/MenuUsuario';
// import MenuPermisos from './components/Permisos/MenuPermisos';
// import PageNotFound from './components/Comun/PageNotFound';

const App = (props) => {

  const cookies = new Cookies()
  
  const [nom,setNom]=useState('')
  const [fromLogin,setFromLogin]=useState(true)

  const asfalto = async() =>{
    await db.collection('G_Permiso').doc(cookies.get('idPerm')).get().then((snap)=>{
      setNom(snap.data().Nombre_G_Perm)
    })
  }

  useEffect(()=>{
    if(cookies.get('id_mayor')){
    asfalto()}
    
  },[])

  

  return (
    <div className="App">

      {cookies.get('id_mayor')? 
        <div>
          <BarContainer nom={nom}/>
        </div>
        :
        <LogIn/>  }
    </div>
  );
}

export default App;
