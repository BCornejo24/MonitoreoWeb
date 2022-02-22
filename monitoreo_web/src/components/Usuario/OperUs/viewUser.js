import React, {useEffect,useState} from "react"
import { db } from "../../../firebase-config";


const ViewUser = (props) =>{
 //   const [base, setbase] = useState('Admin');
    const [lista, setlista] = useState([]);
    
    const bloquearUsuario = async (linkObject) =>{   //Eliminacion de rutinas de la base de datos
        if (window.confirm('Esta seguro de que quiere bloquear a: "'+linkObject.Nombre+''+linkObject.Apellidos)){
            linkObject.Habilitado=!linkObject.Habilitado
            await db.collection('Usuarios').doc(linkObject.id).update(linkObject)
            
        }

    };
    


    const listarRuti = async () =>{ //Rescate on Demand de los Rutinas en Firestore
        db.collection("Usuarios").onSnapshot((querySnapshot) => {
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
        <div className='bloqueCuerpo'>
            <h1>Usuarios</h1>
            <div className="col-md-view">
            
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre+' '+exer.Apellidos}</b></h4>
                        <div>
                            {props.isnested? '':<i className="material-icons text-danger" onClick={()=>bloquearUsuario(exer)} >close</i>}
                        </div>
                        </div>
                        <p>Correo :{exer.Correo}      </p>
                        <p>Estado :{exer.Habilitado? 'Habilitado':'Bloqueado'}</p>
                        <p >Actividad :{exer.fIngreso}</p>
                        
                    </div>
                </div>

            ))}
            </div>
        </div>
    )

};

export default ViewUser