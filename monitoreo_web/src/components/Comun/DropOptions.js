import React, { Component, useEffect, useState } from 'react';
import { db } from '../../firebase-config';

const DropOptions = (props) =>{
    const [list,setList]=useState([])
    const [rend,setrend]=useState(0)
    const Bopcion={
        display:'',
        value:''
    }

    const listarOpc = () =>{
        //db.collection("ManagerColegio").where('UsuarioID','==',props.IdManC).get().then((querySnapshot)=>{
        db.collection('ManagerColegio').where('UsuarioID','==','usId').get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                var LProf = doc.data().Prof_list
                const dat = []
                LProf.map(prof=>{
                         //rescprof(prof)
                        var val = prof
                        db.collection('Profesores').doc(prof).get().then((auxl)=>{
                            //console.log('profesor.data()')
                            var idus = auxl.data().UsuarioID
                            db.collection('Usuarios').doc(idus).get().then((profesor)=>{
                                var display = profesor.data().Nombre+' '+profesor.data().Apellido
                                    var opcs = Bopcion
                                    opcs.display=display
                                    opcs.value=val
                                    //console.log(opcs)
                                dat.push({...opcs})
                                setrend(dat.length)
                            })
                        })
                    })
                setList(dat)
                })
            })
        }

    

    useEffect(()=>{
        listarOpc()
                
    },[])

    return(<>
        {list.map((opc)=>(
            <option key={opc.value+''+rend} value={opc.value}>{opc.display}</option>
        ))}
    </>)

}

export default DropOptions;