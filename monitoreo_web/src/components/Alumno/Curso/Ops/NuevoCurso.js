import React from "react"
import CreateCurso from "./CreateCurso";

function NuevoCurso (){
    return (<>
                <h4 className="subtitle-ground">Crear Curso</h4>
                <div className = 'bloqueCuerpo'>
                   <CreateCurso/>
                </div>
            </>);

}

export default NuevoCurso