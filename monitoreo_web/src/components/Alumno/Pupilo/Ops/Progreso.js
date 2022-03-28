import React, { useEffect, useState } from "react"
import ExViewCurso from '../../Curso/Ops/ExViewCurso'
import Cookies from "universal-cookie"
import { db } from "../../../../firebase-config"
import Prog from "./Prog"

function Progreso (props){
const[detail,setDetail]=useState(false)
const[code,setCode]=useState('')

const volver=()=>{
    setDetail(false)
}

const cambio=(a,b,c)=>{
    setCode(a)
    console.log(a)
    setDetail(true)
}


return(
    <>
    {detail?
    <div className="bloqueCuerpo">
        <Prog atras={volver} detail={detail} code={code}/>
    </div>
    :
    <div className="bloqueCuerpo">
        <ExViewCurso enviarID={cambio} isnestprof={true} Prof={true} isPrognest={true}/>   
    </div>
    }
    </>
)

}

export default Progreso