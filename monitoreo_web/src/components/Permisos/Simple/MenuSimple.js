import React, { useEffect } from 'react';
import ManejarPermisos from './Ops/ManejarPermiso';

function MenuSimple() {

useEffect(()=>{
    //console.log("permisos")
})

    return(
        <div className='bloqueCuerpo'>
            <h1>Menu Simple</h1>
        <ManejarPermisos/>
        </div>
    );
}

export default MenuSimple