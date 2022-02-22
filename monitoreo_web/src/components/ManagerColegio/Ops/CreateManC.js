import React, {useEffect,useState} from "react"
import CreEditManC from "./CreEditManC";
import { db } from "../../../firebase-config";


const CreateManC = (props) =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

    const addOrEdit = async (linkuser,linkAlm) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
        var magma
        
        await db.collection('Usuarios').add(linkuser).then(docRef=>{
            magma=docRef.id
        })
        linkAlm.UsuarioID = magma
        console.log("Datos Usuario guardados")

        var copy = [];
        await db.collection('ManagerColegio').add(linkAlm).then(docRef=>{
            copy.push(docRef.id)
            })
    }

    return(
        <div>Crear Manager
            <CreEditManC {...{addOrEdit,}}/> 
        </div>
    )

};


export default CreateManC