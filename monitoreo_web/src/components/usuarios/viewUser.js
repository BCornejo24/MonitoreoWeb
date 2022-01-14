import React, {useEffect,useState} from "react"
import {db} from '../../firebase-config'


const ViewUser = () =>{
    const [base, setbase] = useState('Admin');
    const [lista, setlista] = useState([]);
    
    const bloquearUsuario = async (linkObject) =>{   //Eliminacion de rutinas de la base de datos
        if (window.confirm('Esta seguro de que quiere bloquear a: "'+linkObject.Nombre+''+linkObject.Apellidos)){
            linkObject.Habilitado=!linkObject.Habilitado
            await db.collection('Usuarios').doc(linkObject.id).update(linkObject)
            
        }

    };
    

  /*  const addOrEdit = async (linkObject) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           if (idEx === ''){
            await db.collection('Rutinas').doc().set(linkObject)
            console.log("Rutina guardada")
           }else{
            await db.collection('Rutinas').doc(idEx).update(linkObject)
            console.log("Rutina Actualizada")
           }
           setidEx('');
    }
*/
    const listarRuti = async () =>{ //Rescate on Demand de los Rutinas en Firestore
        db.collection("Usuarios").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }
    //var b ='Profesores'
  /*  const tip_user  =  (id) =>{
        var aux =id
        var b = ''
        const criterio = ['Profesores','ManagerColegio','Alumno'];
        criterio.map((i)=>{
            //console.log(i)
            db.collection(i).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var a = doc.data()
                    if(id.localeCompare(a.UsuarioID)===0){
                        b=i
                        //console.log(b)
                        
                       // console.log(i)
                    }
                    
                });
        setbase(b[b.length-1])})
        console.log(b)
        });

        
        
    }*/



    

    useEffect(()=>{
        listarRuti();
    }, []);

   
    return(
        <div>
            <div className="col-md-8">
            <h1>Usuarios</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre+' '+exer.Apellidos}</b></h4>
                        <div>
                            <i className="material-icons text-danger" onClick={()=>bloquearUsuario(exer)} >close</i>
                        </div>
                        </div>
                        <p>Correo :{exer.Correo}      </p>
                        <p>Estado :{exer.Habilitado? 'Habilitado':'Bloqueado'}</p>
                    </div>
                </div>

            ))}
            </div>
        </div>
    )

};

export default ViewUser