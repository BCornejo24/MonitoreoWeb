import React, { useEffect } from "react"
import CreateUser from './CreateUser'

const CreateUsuario = () => {

    return (<>
    <br />
        <div className='crearUsuario'>
            <h1 className="subtitle-ground">Crear Usuario</h1>
            <div className = 'bloqueCuerpo'>
                <CreateUser/>
            </div>
        </div>
        </>);
}

export default CreateUsuario