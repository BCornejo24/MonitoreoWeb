import React, {useEffect,useState} from "react"
import cre_editGroups from "./cre_editGroups";
import {db} from '../../firebase-config'
import cre_editGroups from "./cre_editGroups";


const CrearRutina = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           if (idEx === ''){
            await db.collection('G_Permiso').doc().set(linkObject)
            console.log("Grupo permiso guardado")
           }else{
            await db.collection('G_Permiso').doc(idEx).update(linkObject)
            console.log("Rutina Actualizada")
           }
           setidEx('');
    }

    return(
        <div>
            <cre_editGroups {...{addOrEdit, idEx, lista}}/> 
        </div>
    )

};

export default CrearRutina