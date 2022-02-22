import React from 'react';
import ManejarPermiso from './Simple/Ops/ManejarPermiso'
import MenuGrupo from './Grupo/MenuGrupo'
import { Route, Routes } from 'react-router-dom';
import HeadPermisos from './HeadPerm/HeadPermisos';
import MenuSimple from './Simple/MenuSimple';
import MenuRutina from '../Rutina/MenuRutina'
import NuevoGrupo from './Grupo/Ops/NuevoGrupo';
import ViewGrupo from './Grupo/Ops/ViewGrupo';

function MenuPermisos() {
    return(
        <div className='menuPermisos-L'>
            <h1>Menu Permisos</h1>
            <div className='bloqueMenu-L'>
                <HeadPermisos/>
                <Routes>
                        
                        <Route path='/MenuSimple'              element={<MenuSimple/>}/>
                        <Route path='/CrearGrupo'               element={<NuevoGrupo/>}/>
                        <Route path='/VerGrupo'               element={<ViewGrupo/>}/>
                </Routes>
            </div>    
        </div>
        
    );
}

export default MenuPermisos