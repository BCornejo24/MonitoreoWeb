import React, {useEffect,useState} from "react"
import crea_editPerm from "./crea_editPerm";
import {db} from '../../firebase-config'


const Ex_viewAlm = (props) =>{
    const [lista, setlista] = useState([]);
    const [listau, setlistau] = useState([]);
    
    const listarDocumento = async () =>{ //Rescate on Demand de los Documentos en Firestore
        db.collection("Alumnos").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    const limpiar = () =>{
        if(props.curso!==null){
            const docs = [];
            const aux  = [];
            const filtro = await db.collection('Cursos').doc(id).get();
            docs.push(...filtro.AlumnosID);
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
            idobj = await db.collection('Usuarios').doc(id).get();
            docs.push(...idobj);
        })
        setlistau(docs);

    }
   
    useEffect(()=>{
        listarDocumento();
        if(curso.props!== null){
            limpiar();        
            bring();
    }
    }, []);

    return(
        <div>            
            <div className="col-md-8">
            <h1>Alumnos</h1>
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

export default Ex_viewAlm