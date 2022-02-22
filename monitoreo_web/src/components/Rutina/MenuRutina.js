import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HeadRutinas from './HeadRut/HeadRutinas'
import NuevaRutina from './Ops/NuevaRutina';
import ManageRutin from './Ops/ManageRutin'




function MenuRutina() {


    return(<>
    <div>
        <div className='menuRutina'>
            <h3 >Menu Rutina</h3>
                <div className='bloqueMenu'>
                    <HeadRutinas/>
                </div>
                <Routes>
                
                    <Route path='/Crear'             element={<NuevaRutina/>}/>
                    <Route path='/Ver'               element={<ManageRutin/>}/>
                </Routes>
        </div>
    </div>
    </>);
}

export default MenuRutina