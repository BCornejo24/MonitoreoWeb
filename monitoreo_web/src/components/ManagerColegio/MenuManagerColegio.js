import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HeadMC from './HeadMC/HeadMC'
import NuevoManC from './Ops/NuevoManC';
import ViewManC from './Ops/ViewManC'

function MenuManagerColegio() {
    return(<>
        <div>
            <div className='menuUsuario'>
                <h3 >Menu Manager Colegio</h3>
                        <HeadMC/>
                        <Routes>
                    
                    <Route path='/Crear'             element={<NuevoManC/>}/>
                    <Route path='/Ver'               element={<ViewManC/>}/>
                </Routes>
            </div>
            
        </div>
        </>);
}

export default MenuManagerColegio