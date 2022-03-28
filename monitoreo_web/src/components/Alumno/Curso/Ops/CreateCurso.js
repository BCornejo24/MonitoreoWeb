import React, { useState } from "react"
import { db } from "../../../../firebase-config";
import CreEditCurso from "./CreEditCurso";


const CreateCurso = () =>{
  
    const [lisal,setLisal]= useState([])
    const [auxC,setAuxC]=useState()
    
    const addOrEdit = async (linkCur,/*arrus,*/arral) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
        
        setAuxC(linkCur)
        console.log(auxC)
        linkCur.AlumnoID.pop()
        console.log(linkCur)

        console.log(arral)
        for(const us of arral){
            var pup = await crearAlumno(us)
            linkCur.AlumnoID.push(pup)
            console.log(linkCur.AlumnoID)
        }
        console.log('Afuera:')
        console.log(linkCur.AlumnoID)
        await db.collection('Cursos').add(linkCur)
        }

    
                 const crearAlumno = async (obj) =>{
                     console.log(obj)
                    var aux
                    await db.collection('Usuarios').add(obj).then(docRef=>{
                        aux = docRef.id
                        });
    
                    var alm={
                        IMC:0,
                        UsuarioID:aux
                    }

                    await db.collection('Alumno').add(alm).then(docRef=>{
                        aux = docRef.id
                        });
                        return aux
                 }
    return(
        <div>
            <CreEditCurso {...{addOrEdit,}}/>
        </div>
    )

};

export default CreateCurso;
