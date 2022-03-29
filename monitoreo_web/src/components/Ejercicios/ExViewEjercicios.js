import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";


const ExViewEjercicios = (props) =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

const listarEjer = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
    db.collection("Ejercicios").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc)=>{
            docs.push({...doc.data(), id:doc.id});
        });
        setlista(docs);
    });
    
}


const Envio = (id,e,nom) =>{
    e.preventDefault();
    props.enviarID(id,nom);
} 

useEffect(()=>{
    listarEjer();
}, []);

return(
    <div>
        
        <h1>Ejercicios</h1>
        <div className='list-framed'>
        <div className="col-md-view-und-ex">
        {lista.map( exer => (
            <>
            { exer.Estado?
            <div className="card mb-1" key={exer.id}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h4><b>{exer.Nombre_Ejercicio}</b></h4>
                    <div>
                    <button className="material-icons" onClick={(e)=>Envio(exer.id,e,exer.Nombre_Ejercicio)}>add</button>
                    </div>
                    </div>
                    <p>Instrucciones:{exer.Instrucciones}   |   Exigencia:{exer.Exigencia} </p>
                        <p>{exer.Metricas=='Duración'?'Duración' :'Repeticiones'}: {exer.Duracion_Repeticiones} {exer.Metricas=='Duración'?'Minutos' :'Veces'}</p>
                        <p>  Estado: {(exer.Estado)? "habilitado" : "deshabilitado"}</p>
                </div>
            </div>:''}
            </>
        ))}
        </div>
        </div>
    </div>
)

};

export default ExViewEjercicios