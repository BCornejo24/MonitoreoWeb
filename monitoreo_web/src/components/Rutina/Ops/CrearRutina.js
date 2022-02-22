import React, {useState} from "react"
import { db } from "../../../firebase-config";
import CreEditRutin from "./CreEditRutin";


const CrearRutina = () =>{
    const [idEx, setidEx] = useState('');
    const [lista] = useState([]);

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           if (idEx === ''){
            await db.collection('Rutinas').doc().set(linkObject)
            console.log("Rutina guardada")
           }else{
            await db.collection('Rutinas').doc(idEx).update(linkObject)
            console.log("Rutina Actualizada")
           }
           setidEx('');
    }

    return(
        <div className="titleCrearRutina">
            
            <CreEditRutin {...{addOrEdit, idEx, lista}}/> 
        </div>
    )

};

export default CrearRutina