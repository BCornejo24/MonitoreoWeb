import React, { useEffect } from "react"
import ViewGrupo from "./ViewGrupo";

const ExViewGrupos = () => {
    
    useEffect(()=>{
        //console.log("NuevoGrupo")
    })

    return (<>
        
            <div className='crearUsuario'>
                <h3 className="subtitle-ground">Crear Grupo</h3>
                <div className = 'bloqueCuerpo'>
                    <ViewGrupo/>
                </div>
            </div>
            </>);

}

export default ExViewGrupos