import react, { useState } from "react";
import ExViewCurso from "../../Alumno/Curso/Ops/ExViewCurso";
import UpUser from '../../Usuario/OperUs/UpUser'

const ProfDashboard = (props) => {

  

  const [a,seta]=useState(false)

  const volver = () =>{
    seta(false)
  }

  

  return(<><div>
        <h1>Profesor </h1>
        </div>
<p onClick={()=>{seta(!a)}}>Mi Cuenta</p>
{a?<div className="bloqueCuerpo">
<UpUser volver={volver}/>
</div>
:
<div>
<ExViewCurso Prof={true}  isPrognest={true}/>
</div>}
</>)
}

export default ProfDashboard;
