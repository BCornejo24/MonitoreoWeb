import React, {useEffect,useState} from "react"
import {db} from '../../firebase-config'
import Cre_editAlm from "./cre_editAlm";



const CreateAlm = () =>{



    const addOrEdit = async (linkuser,linkAlm,id) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           
        const {id_user} = await db.collection('Usuarios').doc().set(linkuser)
        console.log("Datos Usuario guardados")

       
        linkAlm.UsuarioID = id_user;
        
        await db.collection('Alumnos').doc().set(linkAlm);
        console.log("Datos Alumno guardados");

        const idAlumno = await db.collection('Alumnos').where('UsuarioID','==',idUsuario).get();
        const doc = await db.collection('Cursos').doc(id).get();
        doc.AlumnoID.push(idAlumno);
        await db.collection('Cursos').doc(id).update(doc);
    }

    return(
        <div>
            <Cre_editAlm {...{addOrEdit,}}/> 
        </div>
    )

};

export default CreateAlm