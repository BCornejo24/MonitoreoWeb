import React, {useEffect,useState} from "react"
import CreateRutin from "./CreateRutin"
import {db} from '../../firebase-config'


const CrearRutina = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

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

    const listarRuti = async () =>{ //Rescate on Demand de los Rutinas en Firestore
        db.collection("Rutinas").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    useEffect(()=>{
        listarRuti();
    }, []);

    return(
        <div>
            <CreateRutin {...{addOrEdit, idEx, lista}}/> 
        </div>
    )

};

export default CrearRutina