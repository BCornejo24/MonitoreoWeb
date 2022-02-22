import React, {useEffect,useState} from "react"
import CreEditPermiso from "./CreEditPermiso"
import { db } from "../../../../firebase-config";


const ManejarPermisos = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);
    const [existe,setExiste] = useState('false');

    const eliminarEjercicio = async (id , name) =>{   //Eliminacion de ejercicio de la base de datos
        existencia(id);
        if(!existe){
            if (window.confirm('Esta seguro de que quiere eliminar el ejercicio: "'+name+'"')){
                await db.collection('Ejercicios').doc(id).delete();
            }
        }else{
            alert('No se puede eliminar el permiso '+name+' es parte de un grupo');
        }

    };
    

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto Ejercicio a la base de datos
           
            if (idEx === ''){
            await db.collection('Permiso').doc().set(linkObject)
            console.log("ejercicio guardado")
           }else{
            if(existencia(linkObject.id)){
            await db.collection('Permiso').doc(idEx).update(linkObject)
            console.log("Ejercicio Actualizado")
            }else{
                alert('El permiso asociado a'+linkObject.DescripcionPermiso+' existe en algun grupo, debe quitarlo del grupo para poder editarlo')
            }
           }
           setidEx('');
    }

    const existencia = (id) => {
        db.collection("G_Permiso").get().then(querySnapshot=>{
            querySnapshot.forEach(grup=>{
                if (grup.Permisos !== undefined) {
                    if (grup.Permisos.includes(id)===0){
                        setExiste(true)
                    }
                }
            });
        });
    }

    const listarEjer = async () =>{ //Rescate on Demand de los Documentos en Firestore
        db.collection("Permiso").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    useEffect(()=>{
        listarEjer();
    }, []);

    return(
        <div>Crear/Editar Permiso
            <CreEditPermiso {...{addOrEdit, idEx, lista}}/> 
            
            <div className="col-md-8">
            <h1>Permisos disponibles</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.DescripcionPermiso}</b></h4>
                        <div>
                            <i className="material-icons text-danger" onClick={()=>eliminarEjercicio(exer.id,exer.DescripcionPermiso)} >close</i>
                            <i className="material-icons" onClick={()=>setidEx(exer.id)}>create</i>
                        </div>
                        </div>
                        
                    </div>
                </div>

            ))}
            </div>
        </div>
    )

};

export default ManejarPermisos