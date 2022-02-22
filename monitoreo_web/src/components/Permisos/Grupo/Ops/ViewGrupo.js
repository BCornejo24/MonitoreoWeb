import React, {useEffect,useState} from "react"
import CreEditGroup from "./CreEditGroup";
import { db } from "../../../../firebase-config";


const ViewGrupo = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);

    const eliminarRutina = async (id , name) =>{   //Eliminacion de rutinas de la base de datos
        if (window.confirm('Esta seguro de que quiere eliminar la Rutina: "'+name+'"')){
            await db.collection('G_Permiso').doc(id).delete();
        }

    };
    

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           if (idEx === ''){
            await db.collection('G_Permiso').doc().set(linkObject)
            console.log("Rutina guardada")
           }else{
            await db.collection('G_Permiso').doc(idEx).update(linkObject)
            console.log("Rutina Actualizada")
           }
           setidEx('');
    }

    const listarRuti = async () =>{ //Rescate on Demand de los Rutinas en Firestore
        db.collection("G_Permiso").onSnapshot((querySnapshot) => {
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



    return(<>
        <div>
            <h3 className="subtitle-ground">Ver Grupos</h3>
            { idEx?<div className = 'bloqueCuerpo'>
            <CreEditGroup {...{addOrEdit, idEx}}/></div>:<>
            <div className="col-md-8">
            <h1>Grupos de Permisos</h1>
            <br />
            {lista.map( exer => (
                (exer.Nombre_G_Perm.includes('_B'))? '':
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre_G_Perm}</b></h4>
                        <div>
                            <i className="material-icons text-danger" onClick={()=>eliminarRutina(exer.id,exer.Nombre_G_Perm)} >close</i>
                            <i className="material-icons" onClick={()=>setidEx(exer.id)}>create</i>
                        </div>
                        </div>
                        <p>Cantidad de permisos :{exer.Permisos.length}</p>
                    </div>
                </div>
                
            ))}
            </div></>}
        </div>
    </>)

};

export default ViewGrupo