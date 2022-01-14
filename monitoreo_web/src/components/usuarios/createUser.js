import React from "react"
import {db} from '../../firebase-config'
import Cre_editUser from "./cre_editUser";



const CreateUser = () =>{



    const addOrEdit = async (linkuser) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           
        await db.collection('Usuarios').doc().set(linkuser)
        console.log("Datos Usuario guardados")
    }

    return(
        <div>
            usuario crear
            <Cre_editUser {...{addOrEdit,}}/> 
        </div>
    )

};

 export default CreateUser
