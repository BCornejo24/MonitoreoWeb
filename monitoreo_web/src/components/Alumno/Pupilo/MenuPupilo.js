import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import HeadPupilo from './HeadPupilo/HeadPupilo';
import Progreso from './Ops/Progreso'
import Cookies from 'universal-cookie';
import { db } from '../../../firebase-config';
import VerAlm from './Ops/VerAlm';

function MenuPupilo() {
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
            <h3>Menu Pupilo</h3>
            <div className='subBloqueMenu'>
                    <HeadPupilo perm={name}/>
                </div>
                <div>
                <Routes>
                    
                    
                        
                        <Route path='Ver'             element={<VerAlm/>}/>                        
                        <Route path='Progreso'         element={<Progreso/>}/>
                    
                </Routes>
                </div>
                <Outlet/>
        </div>
        
    );
}

export default MenuPupilo