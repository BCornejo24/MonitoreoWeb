import React from "react"
import CreateCurso from "./CreateCurso";
import ExViewCurso from "./ExViewCurso";

function VerCurso (){
    return (<>
                <h4 className="subtitle-ground">ver Curso</h4>
                <div className = 'bloqueCuerpo'>
                   <ExViewCurso/>
                </div>
            </>);

}

export default VerCurso