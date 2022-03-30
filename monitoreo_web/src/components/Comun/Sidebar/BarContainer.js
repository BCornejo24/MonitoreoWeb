
import {Route,  Routes} from "react-router-dom";

import ProfDashboard from '../../Comun/Dashboards/ProfDashboard';
import AdmDashboard from '../../Comun/Dashboards/AdmDashboard';
import MCDashboard from '../../Comun/Dashboards/MCDashboard';

import Cookies from 'universal-cookie';
import { db } from "../../../firebase-config";
import { useEffect, useState } from 'react';
import BarraLat from './ADM/BarraLat';
import MenuEjercicios from '../../Ejercicios/MenuEjercicios';
import MenuAlumno from '../../Alumno/MenuAlumno';
import MenuProfesor from '../../Profesor/MenuProfesor';
import MenuRutina from '../../Rutina/MenuRutina';
import MenuManagerColegio from '../../ManagerColegio/MenuManagerColegio';
import MenuUsuario from '../../Usuario/MenuUsuario';
import MenuPermisos from '../../Permisos/MenuPermisos';
import PageNotFound from '../../Comun/PageNotFound';
import BarraLatManC from "./ManC/BarraLatManC";
import BarraLatADM from "./ADM/BarraLatADM";
import BarraLatProf from "./Prof/BarraLatProf";

const BarContainer = (props) =>{
    const cookies = new Cookies()
  
    const [nom,setNom]=useState('')
    const [rend,setrend]=useState()
  
    const asfalto = async() =>{
      await db.collection('G_Permiso').doc(cookies.get('idPerm')).get().then((snap)=>{
        setNom(snap.data().Nombre_G_Perm)
      })
    }
  
    useEffect(()=>{
      asfalto()
      console.log(props.nom)
      rutes()
    },[props.nom])
  
    
    const rutes = () => {
            if(nom ==='Profesor_B'){//o8NvU63j0WCoixjzQKeP e e
                setrend(barraProf)
             //return (<ProfDashboard/>);
            }
            if(nom==='Admin_B'){//VXKa4gS5K84o23RIrRqh op op
                setrend(barraADM)
            //return(<AdmDashboard />)
            }
            if(nom==='ManagerColegio_B'){//bkLZxOXabrwf05kZ4Prr hhh hhh
                setrend(barraMC)
             // return(<MCDashboard/>)
            }
          }
  
    const barraProf=(<>
        <BarraLatProf/>
        <Routes>
                        <Route exact path='/Home'                element={<ProfDashboard/>}/>
                        <Route path='/MenuAlumno/*'                element={<MenuAlumno/>} />
                        <Route path='/MenuRutina/*'                element={<MenuRutina/>} />
                        <Route path='/Home'/>
                        <Route index element={<ProfDashboard/>}/>
                        <Route path='*' element={<PageNotFound/>}/>
                      </Routes>
        </>)

    const barraADM=(<>
        <BarraLatADM />
            <Routes>
                    <Route exact path='/Home'                element={<AdmDashboard />}/>
                    <Route path='/MenuEjercicios/*'            element={<MenuEjercicios/>} />
                    <Route path='/MenuRutina/*'                element={<MenuRutina/>} />
                    <Route path='/MenuManagerColegio/*'         element={<MenuManagerColegio/>} />
                    <Route path='/MenuUsuario/*'                element={<MenuUsuario/>} />
                    <Route path='/MenuPermisos/*'             element={<MenuPermisos/>} />
                    <Route path='/Home'/>
                    <Route index element={<AdmDashboard />}/>
                    <Route path='*' element={<PageNotFound/>}/>
              </Routes>
        </>)

    const barraMC=(<>
        <BarraLatManC/>
        <Routes>
                        <Route exact path='/Home'                element={<MCDashboard/>}/>
                        <Route path='/MenuAlumno/*'                element={<MenuAlumno/>} />
                        <Route path='/MenuProfesor/*'             element={<MenuProfesor/>} />
                        <Route path='/Home'/>       
                        <Route index element={<MCDashboard/>}/>
                        <Route path='*' element={<PageNotFound/>}/>
                      </Routes>
        </>)


    return (
      <div className="App">
  
         
          <div>
            <div className="title-ground">
              <div className="bloqueNavegacion">
              {rend}
              </div>          
            </div>
          </div>
                </div>
    );
}
export default BarContainer