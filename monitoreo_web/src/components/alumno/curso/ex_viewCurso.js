import React, {useEffect,useState} from "react"
import {db} from '../../../firebase-config'


const Ex_viewCurso = (props) =>{
    const [lista, setlista] = useState([]);
    
    const listarDocumento = async () =>{ //Rescate on Demand de los Documentos en Firestore
        db.collection("Curso").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    useEffect(()=>{
        listarDocumento(); 
        if(props.filter!==null){
            limpiar();
        }       
    }, []);


    const limpiar = () =>{
        if(props.filter!==null){
            const docs = [];
            const aux  = [];
            const filtro = db.collection('ManagerColegio').doc(props.filter).get();
            docs.push(...filtro.Cursos_list);
            docs.forEach(idfilter=>{
                lista.forEach(alfilter=>{
                    if(alfilter.id===idfilter){
                        aux.push(alfilter);
                    }
                })
                }
                )
                setlista(aux);}
            
        }



    return(
        <div>            
            <div className="col-md-8">
            <h1>Cursos</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.grado + exer.letra}</b></h4>
                        <h2>{exer.AlumnoID.lenght+"alumnos en el curso"}</h2>
                            <div>
                                <i className="material-icons text-danger" onClick={(e)=>props.enviarID(exer.id,e,exer.grado,exer.letra)} >add_circle</i>
                            </div>
                        </div>                        
                    </div>
                </div>

            ))}
            </div>
        </div>
    )

};

export default Ex_viewCurso;