import React, { Component, useEffect, useState } from 'react';
import { db } from '../../firebase-config';

const DropOptions = (props) =>{
    const [list,setList]=useState([])
    const [rend,setrend]=useState(0)
    const Bopcion={
        display:'',
        value:''
    }

    const listarOpcMC = () =>{        // Listar Profesores del Manager Colegio
        db.collection("ManagerColegio").where('UsuarioID','==',props.IdManC).get().then((querySnapshot)=>{
        //db.collection('ManagerColegio').where('UsuarioID','==','usId').get().then((querySnapshot)=>{
        
            querySnapshot.forEach((doc)=>{
                var LProf = doc.data().Prof_list
                const dat = []
                LProf.map(prof=>{
                         //rescprof(prof)
                        var val = prof
                        db.collection('Profesores').doc(prof).get().then((auxl)=>{
                            var idus = auxl.data().UsuarioID
                            db.collection('Usuarios').doc(idus).get().then((profesor)=>{
                                var display = profesor.data().Nombre+' '+profesor.data().Apellido
                                    var opcs = Bopcion
                                    opcs.display=display
                                    opcs.value=val
                                dat.push({...opcs})
                                setrend(dat.length)
                            })
                        })
                    })
                setList(dat)
                })
            })
        }

    const listarOpcPerm = () =>{
        db.collection('G_Permiso').onSnapshot(querySnapshot=>{
            var docs = []
            querySnapshot.forEach(doc=>{
               // console.log(doc.data())
                var termino = doc.data().Nombre_G_Perm
                termino = termino.slice(-2)
                if(termino!=='_B'){
                    var opcs = Bopcion
                    opcs.display =doc.data().Nombre_G_Perm
                    opcs.value = doc.id
                    docs.push(opcs)
                    setrend(docs.length)
                }
            })
        setList(docs)
        })
    }    
    

    useEffect(()=>{
        if(props.choose == 'MC'){
            listarOpcMC()
        }
        if(props.choose == 'GP'){
            listarOpcPerm()
        }
                
    },[])

    return(<>
        {list.map((opc)=>(
            <option key={opc.value+''+rend} value={opc.value}>{opc.display}</option>
        ))}
    </>)

}

export default DropOptions;