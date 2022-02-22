import React, { useEffect } from "react"
import CrearGrupo from './CrearGrupo';

const NuevoGrupo = () => {
    
    useEffect(()=>{
        console.log("NuevoGrupo")
    })

    return (<>
        
            <div className='crearUsuario'>
                <h3 className="subtitle-ground">Crear Grupo</h3>
                <div className = 'bloqueCuerpo'>
                    <CrearGrupo/>
                </div>
            </div>
            </>);

}

export default NuevoGrupo