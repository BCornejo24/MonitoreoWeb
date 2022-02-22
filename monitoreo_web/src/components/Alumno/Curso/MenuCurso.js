import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import HeadCurso from './HeadCurso/HeadCurso';
import NuevoCurso from './Ops/NuevoCurso';
import VerCurso from './Ops/VerCurso';
import Cookies from 'universal-cookie';
import AsignarRutina from './Ops/AsignarRutina';
import { db } from '../../../firebase-config';

function MenuCurso() {
    const cookie = new Cookies
    const [name,setname]=useState('')

    const getperm = () =>{
        const cookie = new Cookies
        db.collection('G_Permiso').doc(cookie.get('idPerm')).get().then((snap)=>{
            //console.log(snap.data())
            setname(snap.data().Nombre_G_Perm)
            //console.log(name) 
          })
    }
    useEffect(()=>{
        getperm()
    })

    return(
        <div className='subMenuCurso'>
            <h3>Menu Curso</h3>
            <div className='subBloqueMenu'>
                    <HeadCurso/>
                </div>
                <div>
                <Routes>
                    
                    
                        <Route path='Crear'           element={<NuevoCurso/>}/>
                        <Route path='Ver'             element={<VerCurso/>}/>
                        
                        <Route path='Asignar'         element={<AsignarRutina/>}/>
                    
                </Routes>
                </div>
                <Outlet/>
        </div>
        
    );
}

export default MenuCurso