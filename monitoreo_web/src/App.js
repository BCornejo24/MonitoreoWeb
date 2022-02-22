
import './App.css';

import {Route,  Routes} from "react-router-dom";
//import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { db } from './firebase-config';

import ProfDashboard from './components/Comun/Dashboards/ProfDashboard';
import AdmDashboard from './components/Comun/Dashboards/AdmDashboard';
import MCDashboard from './components/Comun/Dashboards/MCDashboard';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

import LogIn from './components/Comun/LogIn';
import BarraLat from './components/Comun/Sidebar/ADM/BarraLat';
import MenuEjercicios from './components/Ejercicios/MenuEjercicios';
import MenuAlumno from './components/Alumno/MenuAlumno';
import MenuProfesor from './components/Profesor/MenuProfesor';
import MenuRutina from './components/Rutina/MenuRutina';
import MenuManagerColegio from './components/ManagerColegio/MenuManagerColegio';
import MenuUsuario from './components/Usuario/MenuUsuario';
import MenuPermisos from './components/Permisos/MenuPermisos';
import Validar from './components/Comun/validar';
import PageNotFound from './components/Comun/PageNotFound';

const App = (props) => {

  const cookies = new Cookies()
  
  const [nom,setNom]=useState('')

  const asfalto = async() =>{
    await db.collection('G_Permiso').doc(cookies.get('idPerm')).get().then((snap)=>{
      setNom(snap.data().Nombre_G_Perm)
    })
  }

  useEffect(()=>{
    if(cookies.get('id_mayor'))
    asfalto()
  },[])

  
  const rutes = () => {
          if(nom ==='Profesor_B'){//o8NvU63j0WCoixjzQKeP e e
          
           return (<ProfDashboard/>);
          }
          if(nom==='Admin_B'){//VXKa4gS5K84o23RIrRqh op op
          return(<AdmDashboard />)
          }
          if(nom==='ManagerColegio_B'){//bkLZxOXabrwf05kZ4Prr hhh hhh
                      
            return(<MCDashboard/>)
          }
        }
    /*const dRuts =(
      
    )*/



  return (
    <div className="App">

      {cookies.get('id_mayor')? 
        <div>
          <div className="title-ground">
            <div className="bloqueNavegacion">
            <BarraLat/>
                    <Routes>
                       <Route exact path='/Home'                element={rutes()}/>
                      {(nom ==='Profesor_B' ||nom==='ManagerColegio_B') ?<Route path='/MenuAlumno/*'                element={<MenuAlumno/>} />:''}
                      {nom==='ManagerColegio_B'?<Route path='/MenuProfesor/*'             element={<MenuProfesor/>} />  :''}         
                      {nom==='Admin_B'?<Route path='/MenuEjercicios/*'            element={<MenuEjercicios/>} />:''}
                      {nom==='Admin_B'?<Route path='/MenuRutina/*'                element={<MenuRutina/>} />:''}
                      {(nom==='Admin_B' || nom ==='Profesor_B')?<Route path='/MenuManagerColegio/*'         element={<MenuManagerColegio/>} />:''}
                      {nom==='Admin_B'?<Route path='/MenuUsuario/*'                element={<MenuUsuario/>} />:''}
                      {nom==='Admin_B'?<Route path='/MenuPermisos/*'             element={<MenuPermisos/>} />:''}
                      <Route index />:
                      <Route path='*' element={<PageNotFound/>}/>
                    </Routes>
            </div>          
          </div>
        </div>
        :
        <LogIn/>  }
    </div>
  );
}

export default App;
