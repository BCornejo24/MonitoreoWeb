import React, {useEffect,useState} from "react"
import { db } from "../../../firebase-config";
import CreEditRutin from "./CreEditRutin";


const ManageRutin = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

    const eliminarRutina = async (linkObject) =>{   //Eliminacion de rutinas de la base de datos
        if (window.confirm('Esta seguro de que quiere '+(linkObject.Estado? '' : 'des-')+ 'bloquear la rutina: "'+linkObject.Nombre_Rutina+'"')){
            linkObject.Estado=!linkObject.Estado
            await db.collection('Rutinas').doc(linkObject.id).update(linkObject)
            
        }

    };
    

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
            { idEx?
            <div className='bloqueCuerpo'>
            <CreEditRutin {...{addOrEdit, idEx, lista}}/>
            </div>
            :
            <div className='bloqueCuerpo'>
            <h1>Rutinas</h1>
            <div className="col-md-view">
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre_Rutina}</b></h4>
                        <div>
                            <i className="material-icons text-danger" onClick={()=>eliminarRutina(exer)} >close</i>
                            <i className="material-icons" onClick={()=>setidEx(exer.id)}>create</i>
                        </div>
                        </div>
                        <p>Numero de Actividades :{exer.nActividades}</p>
                        <p>Descripcion: {exer.Descripcion}</p>
                    </div>
                </div>

            ))}
            </div></div>}
        </div>
    )
    
};

export default ManageRutin