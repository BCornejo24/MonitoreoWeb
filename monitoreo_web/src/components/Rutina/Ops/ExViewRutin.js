import React, {useEffect,useState} from "react"
import Cookies from "universal-cookie";
import { db } from "../../../firebase-config";


const ExViewRutin = (props) =>{
    const [lista, setlista] = useState([]);
    
    const cookie = new Cookies()

    const rescNPerm = () =>{
        db.collection('Profesores').where('UsuarioID','==',cookie.get('id_mayor')).get().then(querySnapshot=>{
            querySnapshot.forEach((snap)=>{
                return(snap.data().Nombre_G_Perm) 
              })
        })
    }

    const listarRuti = async () =>{ //Rescate on Demand de los Rutinas en Firestore
        db.collection("Rutinas").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                if(doc.data().Autor===cookie.get('id_mayor') || doc.data().Autor==='base')
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    useEffect(()=>{
        listarRuti();
    }, []);

    const enviar = (a,n) =>{
        props.enviarID(a,n)
    }

    return(
        <div>
            { 
            <div className='bloqueCuerpo'>
            <h1>Rutinas</h1>
            <div className="col-md-view">
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre_Rutina}</b></h4>
                        <div>
                            <button className="material-icons" onClick={()=>{enviar(exer.id,exer.Nombre_Rutina)}}>add</button>
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

export default ExViewRutin