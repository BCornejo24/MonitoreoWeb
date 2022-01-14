import React, {useEffect,useState} from "react"
import crea_editPerm from "./crea_editPerm";
import {db} from '../../firebase-config'


const viewPerm = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);
    const [listag, setlistag] = useState([]);

    const eliminarDocumento = async (id ) =>{   //Eliminacion de documento de la base de datos
        var existe = 0;
        listag.map( group =>{ // lista de los grupos
            group.permisos.map(perm=>{ // lista de los permisos en el grupo
                if(perm===id){
                    existe+=1;
                }  
            })})
        if(existe>0){
            alert("No se puede Eliminar este Permiso, es parte de un grupo");
        }else{
                 await db.collection('Permiso').doc(id).delete();
                }
        
        };
    

    const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto Ejercicio a la base de datos
           if (idEx === ''){
            await db.collection('Permiso').doc().set(linkObject)
            alert("Permiso guardado")
           }else{
               }
            await db.collection('Permiso').doc(idEx).update(linkObject)
            alert("Permiso Actualizado")
         setidEx('');
    }

    const listarDocumento = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
        db.collection("Permiso").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    const listarDocumentoGroup = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
        db.collection("G_Permiso").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlistag(docs);
        });
        
    }

    useEffect(()=>{
        listarDocumento();
        listarDocumentoGroup();
    }, []);

    return(
        <div>
            {idEx?
            <crea_editPerm {...{addOrEdit, idEx, lista}}/> :
            
            <div className="col-md-8">
            <h1>Permisos</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Desc_Permiso}</b></h4>
                            <div>
                                <i className="material-icons text-danger" onClick={()=>eliminarDocumento(exer.id)} >close</i>
                            </div>
                        </div>                        
                    </div>
                </div>

            ))}
            </div>}
        </div>
    )

};

export default viewPerm