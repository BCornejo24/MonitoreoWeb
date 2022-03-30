import React from "react"
import { db } from "../../../firebase-config";
import CreEditUser from "./CreEditUser";
import Cookies from "universal-cookie";


const UpUser = (props) =>{

    const cookies = new Cookies()

    

    const addOrEdit = async (linkuser) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           
        await db.collection('Usuarios').doc(cookies.get('id_mayor')).update(linkuser)
        //console.log("Datos Usuario guardados")
        props.volver()
    }

    return(
        <div>
            <CreEditUser edit={true} {...{addOrEdit}}/> 
        </div>
        )

};

 export default UpUser
