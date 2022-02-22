import React, {useEffect,useState} from "react"
import { db } from "../../../../firebase-config";


const ExViewPerm = (props) =>{
    const [lista, setlista] = useState([]);

    const listarEjer = async () =>{ //Rescate on Demand de los Documentos en Firestore
        db.collection("Permiso").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    const envio = (id,e,nom) =>{
        e.preventDefault();
        props.enviarID(id,nom);
    } 
    

    useEffect(()=>{
        listarEjer();
    }, []);

    return(<>
        
            <h1>Permisos</h1>
            <div className='list-framed'>
            <div className="col-md-view-und-ex"></div>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.DescripcionPermiso}</b></h4>
                        <div>
                            <button className="material-icons" onClick={(e)=>envio(exer.id,e,exer.DescripcionPermiso)} >add</button>
                        </div>
                        </div>
                        
                    </div>
                </div>

            ))}
            </div>
        
    </>)

};

export default ExViewPerm