import React, {useEffect,useState} from "react"
import cre_editManC from "./cre_editManC";
import {db} from '../../firebase-config'


const CrearRutina = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           if (idEx === ''){
            await db.collection('ManagerColegio').doc().set(linkObject)
            console.log("Rutina guardada")
           }else{
            await db.collection('ManagerColegio').doc(idEx).update(linkObject)
            console.log("Rutina Actualizada")
           }
           volver();
    }

    const volver = (e) =>{
        if (e!==null){
            e.preventDefault();
        }
        setidEx('');
    }

    return(
        <div>
            <cre_editManC {...{addOrEdit, idEx, lista}}/> 
        </div>
    )

};

export default CrearRutina