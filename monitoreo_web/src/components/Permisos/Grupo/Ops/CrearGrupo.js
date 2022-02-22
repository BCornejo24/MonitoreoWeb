import React, {useEffect,useState} from "react"
import { db } from "../../../../firebase-config";
import CreEditGroup from "./CreEditGroup";


const CrearGrupo = () =>{
    const [idEx, setidEx] = useState('');

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           if (idEx === ''){
            await db.collection('G_Permiso').doc().set(linkObject)
            console.log("Rutina guardada")
           }else{
            await db.collection('G_Permiso').doc(idEx).update(linkObject)
            console.log("Rutina Actualizada")
           }
           setidEx('');
    }

    return(
        <div>
            <CreEditGroup {...{addOrEdit, idEx}}/> 
        </div>
    )

};

export default CrearGrupo