import React from "react"
import CreateProfesor from "./CreateProfesor";

const NuevoProfesor = () => {
    return (<>
        <br />
            <div className='crearUsuario'>
                <h3 className="subtitle-ground">Crear Profesor</h3>
                <div className = 'bloqueCuerpo'>
                    <CreateProfesor/>
                </div>
            </div>
            </>);

}

export default NuevoProfesor