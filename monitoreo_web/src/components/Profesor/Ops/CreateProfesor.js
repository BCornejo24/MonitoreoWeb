import React, {useState} from "react"
import CreEditProfesor from "./CreEditProfesor";
import { db } from "../../../firebase-config";
import Cookies from "universal-cookie";


const CreateProfesor = () =>{

    const [auxVal,setAuxVal]=useState()
    const [auxObj,setAuxObj]=useState()
    const cookie = new Cookies
        
    const valores_iniciales_tipo={
        UsuarioID:'',
        }

    const addOrEdit = async (linkuser) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
        var aux
        
       await db.collection('Usuarios').add(linkuser).then(docRef=>{
        aux = docRef.id
        });//console.log("Datos Usuario guardados")

        var prof=valores_iniciales_tipo
        prof.UsuarioID=aux
        
        await db.collection('Profesores').add(prof).then(docRef=>{
            aux= docRef.id
            //console.log('Profesor ID = '+ aux)
        });//console.log('Datos Profesor Guardados')

        
        var auxi
        var auxobj    
        await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            querySnapshot.forEach(man=>{
                auxobj = man.data()
                auxi=man.id
            })
        })
        //console.log(auxobj)
        auxobj.Prof_list.push(aux)
         
        //console.log(auxobj)
        //console.log(aux)
        await db.collection('ManagerColegio').doc(auxi).update(auxobj)
        
        
    }

    return(
        <div>
            <CreEditProfesor {...{addOrEdit,}}/> 
        </div>
    )

};


export default CreateProfesor