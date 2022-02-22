import React, {useState} from "react"
import CreEditProfesor from "./CreEditProfesor";
import { db } from "../../../firebase-config";
import Cookies from "universal-cookie";


const CreateProfesor = () =>{

    const [aux,setAUX]=useState()
    const cookie = new Cookies

    const addOrEdit = async (linkuser,linkAlm) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
        var magma
        
        await db.collection('Usuarios').add(linkuser).then(docRef=>{
            magma=docRef.id
        })
        linkAlm.UsuarioID = magma
        console.log("Datos Usuario guardados")

        var copy ;
        await db.collection('Profesores').add(linkAlm).then(docRef=>{
            copy= docRef.id
            })

        await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            querySnapshot.forEach(man=>{
                setAUX(man.data())
            })
        })

        aux.Prof_list.push(copy)
        await db.collection('ManagerColegio').doc(aux.id).update(aux)
        setAUX()
        
    }

    return(
        <div>
            <CreEditProfesor {...{addOrEdit,}}/> 
        </div>
    )

};


export default CreateProfesor