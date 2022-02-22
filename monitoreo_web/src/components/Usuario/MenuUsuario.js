import React from 'react';
import CreateUsuario from './OperUs/CreateUsuario';
import { Route, Routes } from 'react-router-dom';
import HeadUser from './HeaderUser/HeadUser'
import ViewUser from './OperUs/viewUser'


const MenuUsuario = ()=> {

    return(<>
    <div>
        <div className='menuUsuario'>
            <h3 >Menu Usuario</h3>
                <div className='bloqueMenu'>
                    <HeadUser/>
                </div>
                <Routes>
                    <Route path='/Crear'             element={<CreateUsuario/>}/>
                    <Route path='/Ver'               element={<ViewUser/>}/>
                </Routes>
        </div>
        
    </div>
    </>);
}

export default MenuUsuario