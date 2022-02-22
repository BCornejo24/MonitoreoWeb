import React, {useEffect,useState} from "react"
import { db } from "../../../firebase-config";


const ViewManC = () =>{
    //   const [base, setbase] = useState('Admin');
    const [listaUS, setlistaUS] = useState([]);
    const [listaMa,setListaMa] = useState([]);
    const [lismast,setLismas] =useState([])
    const [rend,setrend] = useState(0)

    
    const bloquearUsuario = async (linkObject,a) =>{   //Eliminacion de rutinas de la base de datos
        if (window.confirm('Esta seguro de que quiere bloquear al Colegio: '+a)){
            linkObject.Habilitado=!linkObject.Habilitado
            await db.collection('Usuarios').doc(linkObject.id).update(linkObject)
            
        }

    };
    

    const listar = async () =>{ //Rescate on Demand de los Rutinas en Firestore
        
        await db.collection("Usuarios").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlistaUS(docs);
        });
       
        
    }

    const listarM = async() =>{
        await db.collection("ManagerColegio").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setListaMa(docs);
        });
        }
    


    useEffect(()=>{
        listar();
        listarM();
       
    }, []);

    useEffect(()=>{
        setrend(rend+1)
    },[])

   
    return(<>
        <div className='bloqueCuerpo'>
            <h1>Colegios</h1>
            <div className="col-md-view">
                
            {
                listaMa.map(ma=>(
                        <div className="card mb-1" key={ma.id}>
                    
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                            <h4><b>{ma.Colegio}</b></h4>
                            <div>
                            
                            </div>
                            </div>
                        </div>
                    </div>

                       ))}

            </div>
        </div>
        </>)

};

export default ViewManC