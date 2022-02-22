import react, { useState } from "react";
import UpUser from '../../Usuario/OperUs/UpUser'
import ViewUser from "../../Usuario/OperUs/viewUser";

const AdmDashboard = () => {
  const [a,seta]=useState(false)

  const volver = () =>{
    seta(false)
  }

  return(<><div>
    <h1>Admin Dashboard</h1>
</div>
<p onClick={()=>{seta(!a)}}>Mi Cuenta</p>
{a?<div className="bloqueCuerpo">
<UpUser volver={volver}/>
</div>
:
<div>
<ViewUser isnested={true}/>
</div>}
</>)}

export default AdmDashboard;
