import React, {useEffect,useState} from "react"
import crea_editPerm from "./crea_editPerm";
import {db} from '../../firebase-config'


const ex_viewPerm = (props) =>{
    const [lista, setlista] = useState([]);
    
    const listarDocumento = async () =>{ //Rescate on Demand de los Documentos en Firestore
        db.collection("Permiso").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    useEffect(()=>{
        listarDocumento();        
    }, []);

    return(
        <div>            
            <div className="col-md-8">
            <h1>Permisos</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Desc_Permiso}</b></h4>
                            <div>
                                <i className="material-icons text-danger" onClick={()=>props.enviarID(exer.id,e, exer.Desc_Permiso)} >add_circle</i>
                            </div>
                        </div>                        
                    </div>
                </div>

            ))}
            </div>
        </div>
    )

};

export default ex_viewPerm