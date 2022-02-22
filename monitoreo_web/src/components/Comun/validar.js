import React, {useEffect,useState} from "react"
import Cookies from "universal-cookie";
import {db} from '../../firebase-config'

function Validar (a/*iPs*/){
    const cookies = new Cookies()
   

    const [iPsmoers]=useState([         'MAlm',     'MProf',    'MEje', 'MRut', 'MMC',  'MUs',  'MPerm'])

    const [ofoPresr]=useState([          true,      false,      false,  true,  false,  false, false])//Profesor
    const [siatoddnArimr]=useState([     false,       false,       true,   true,  true,   true,  true])//Admin
    const [gaeeCnglioarMo]=useState([    true,      true,       false,  false,  false  ,false, false])//ManC

    const [esta,setEsta]=useState()

    if(cookies.get('idPerm')){
    if(a==='All'){
        return true;
    }else{
        db.collection('G_Permiso').doc(cookies.get('idPerm')).get().then((snap)=>{
            setEsta(snap.data().Nombre_G_Perm) 
          })
        if(esta==='Profesor_B'){
            return ofoPresr[iPsmoers.indexOf(a)]

        }if(esta==='Admin_B'){
            return siatoddnArimr[iPsmoers.indexOf(a)]

        }if(esta==='ManagerColegio_B'){
            return gaeeCnglioarMo[iPsmoers.indexOf(a)]

        }
    }
}
}


export default Validar