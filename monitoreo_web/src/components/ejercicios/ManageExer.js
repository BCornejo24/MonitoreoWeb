import React, {useEffect,useState} from "react"
import Createexer from "./Createexer"
import { db } from "../../firebase-config";


const ManageExer = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

    const eliminarEjercicio = async (linkObject) =>{   //Eliminacion de ejercicio de la base de datos
        
        if (window.confirm('Esta seguro de que quiere '+(linkObject.exigencia? '' : 'des-')+ 'bloquear el ejercicio: "'+linkObject.Nombre_Ejercicio+'"')){
            linkObject.exigencia=!linkObject.exigencia
            await db.collection('Ejercicios').doc(linkObject.id).update(linkObject)
            
        }

    };
    

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto Ejercicio a la base de datos
           if (idEx === ''){
            await db.collection('Ejercicios').doc().set(linkObject)
            console.log("ejercicio guardado")
           }else{
            await db.collection('Ejercicios').doc(idEx).update(linkObject)
            console.log("Ejercicio Actualizado")
           }
           setidEx('');
    }

    const listarEjer = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
        db.collection("Ejercicios").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    useEffect(()=>{
        listarEjer();
    }, []);

    return(
        <div>
            <div className="col-md-23">
            <Createexer {...{addOrEdit, idEx, lista}}/> 
            </div>
            <div className="col-md-8">
            <h1>Ejercicios</h1>
            <div className='list-framed'>
            <div className="col-md-view-und">
            {lista.map( exer => (
                
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre_Ejercicio}</b></h4>
                        <div>
                            <i className="material-icons text-danger" onClick={()=>eliminarEjercicio(exer)} >close</i>
                            <i className="material-icons" onClick={()=>setidEx(exer.id)}>create</i>
                        </div>
                        </div>
                        <p>Instrucciones:{exer.Instrucciones}   |   Exigencia:{exer.Exigencia} </p>
                        <p>Duracion/Repeticiones: {exer.Duracion_Repeticiones} {exer.Metricas=='Tiempo'?'Minutos' :'Veces'}</p>
                        <p>  Estado: {(exer.exigencia)? "habilitado" : "deshabilitado"}</p>
                    </div>
                </div>

            ))}
            </div>
            </div>
        </div>
        </div>
    )

};

export default ManageExer