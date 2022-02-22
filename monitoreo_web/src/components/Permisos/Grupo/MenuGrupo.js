import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HeadM_Grupos from './HeadGrupo/HeadM_Grupos';
import NuevoGrupo from './Ops/NuevoGrupo';
import ViewGrupo from './Ops/ViewGrupo';


function MenuGrupo() {

    /*const ruGru=(
        <>
            <div className='bloqueMenu'>
                <HeadM_Grupos/>
                <Routes>
                    <Route path='/MenuGrupo/'             element={<MenuGrupo/>}/>
                    <Route path='/Crear'             element={<NuevoGrupo/>}/>
                    <Route path='/Ver'               element={<ViewGrupo/>}/>
                </Routes>
            </div>
        </>
    )*/

    return(<>
        <div>
            <div className='menuRutina'>
                <h3 >Sub-Menu Grupo</h3>
                    <div className='bloqueMenu'>
                        <HeadM_Grupos/>
                            <Routes>
                                <Route path="/Crear" element={<NuevoGrupo/>}/>
                            </Routes>
                    </div>
            </div>
        </div>
        </>
    );
}

export default MenuGrupo