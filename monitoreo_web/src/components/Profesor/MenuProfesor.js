import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HeadProfesor from './HeadProfesor/HeadProfesor'
import NuevoProfesor from './Ops/NuevoProfesor';
import ViewProfesor from './Ops/ViewProfesor'

function MenuProfesor() {
    return(<>
        <div>
            <div className='menuUsuario'>
                <h3 >Menu Profesor</h3>
                        <HeadProfesor/>
                        <Routes>
                    
                    <Route path='/Crear'             element={<NuevoProfesor/>}/>
                    <Route path='/Ver'               element={<ViewProfesor/>}/>
                </Routes>
            </div>
            
        </div>
        </>);
}

export default MenuProfesor