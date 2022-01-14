import React, {useEffect,useState} from "react"
import {db} from '../../firebase-config'
import Cre_editProf from './cre_editProf'


const CreateProf = () =>{



    const addOrEdit = async (linkuser,linkAlm) => {   //Escritura en la base de firestore. Se agrega un documento(s) a la base de datos
       // if (idEx === ''){
            await db.collection('Profesores').doc().set(linkAlm)
            console.log("ejercicio guardado")
           
            await db.collection('Usuarios').doc().set(linkuser)
            console.log("Datos Usuario guardados")

            const idUsuario = await db.collection('Usuarios').where('correo','==',linkuser.Correo).get();
            linkAlm.UsuarioID = idUsuario
        
            await db.collection('Profesores').doc().set(linkAlm);
            console.log("Datos Profesor guardados");
            
            <ontact  email={linkuser.Correo} message={linkuser.Pass} tname={linkuser.Nombre+' '+linkuser.Apellidos} tipo={'new'} />
/*
        }else{{
            const idUsuario = await db.collection(Usuarios).where('correo','==',linkuser.Correo).get();
            linkAlm.UsuarioID = idUsuario
            await db.collection('Profesores').doc(idEx).update(linkAlm);
            await db.collection('Usuarios').doc(idUsuario).update(linkuser);
            console.log("Ejercicio Actualizado");
   }
   setidEx('');
           }*/
    }

    return(
        <div>
            <Cre_editProf {...{addOrEdit}}/> 
        </div>
    )

};

export default CreateProf