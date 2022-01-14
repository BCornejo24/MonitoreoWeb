import React, {useEffect,useState} from "react"
import {db} from '../../firebase-config'


const ViewProf = (props) =>{
    const [lista, setlista] = useState([]);
    const [listau, setlistau] = useState([]);
    
    const listarDocumento = async () =>{ //Rescate on Demand de los Documentos en Firestore
        db.collection("Profesor").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    const limpiar = () =>{
        
        const docs = [];
        const aux  = [];
        if(props.colegio!==null){
            const filtro =  db.collection('ManagerColegio').doc(props.colegio).get();
            docs.push(filtro.AlumnosID);
            docs.forEach(idfilter=>{
                lista.forEach(alfilter=>{
                    if(alfilter.id===idfilter){
                        aux.push(alfilter);
                    }
                })
                }
                )}
            setlista(aux);
        }

    const bring = () =>{
        const docs = [];
        lista.forEach(alumn=>{
            const id = alumn.UsuarioID;
            const idobj = db.collection('Usuarios').doc(id).get();
            docs.push(...idobj);
        })
        setlistau(docs);

    }
   
    useEffect(()=>{
        listarDocumento();
        if(props.curso!== null){
            limpiar();        
            bring();
    }
    }, []);

    return(
        <div>            
            <div className="col-md-8">
            <h1>Profesores</h1>
            {lista.map( (exer) => (
                listau.map((us)=>{
                        if (exer.UsuarioID===us.id){                            
                        <div className="card mb-1" key={exer.id}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                <h4><b>{us.Nombre+' '+us.Apellido}</b></h4>
                                    <div>
                                        <i className="material-icons text-danger" onClick={()=>props.enviarID(exer.id)} >add_circle</i>
                                    </div>
                                </div>                        
                            </div>
                        </div>
        }
                        })))}
            </div>
        </div>
    )

};

export default ViewProf;