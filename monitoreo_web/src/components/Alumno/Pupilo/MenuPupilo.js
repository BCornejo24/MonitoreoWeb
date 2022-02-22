import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeadPup from './HeadPup/HeadPup'
import ExViewAlm from './Ops/ExViewAlm';
import VerAlm from './Ops/VerAlm';

function MenuPupilo() {

    useEffect(()=>{
        console.log("MenuPupilo")
    })

    return(
        <div className='menuPupilo'>
            <h1>Menu Pupilo</h1>
            <div className='bloqueMenu'>
            <HeadPup/>
                </div>
                <Routes>
                    
                    <Route path='Ver'             element={<VerAlm/>}/>
                    
                </Routes>
        </div>
    );
}

export default MenuPupilo