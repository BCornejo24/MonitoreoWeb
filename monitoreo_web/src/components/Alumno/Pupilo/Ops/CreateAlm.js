import React from "react"
import { db } from "../../../../firebase-config";
import CreEditAlm from "./CreEditAlm";



const CreateAlm = (props) =>{
 /* const [doc,setdoc] = useState('');
    const [idal,setidal] = useState('');*/
    //const [idus,setidus] = useState('');


    const addOrEdit = async (linkuser,linkAlm) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
        var magma
        
        await db.collection('Usuarios').add(linkuser).then(docRef=>{
            magma=docRef.id
        })
        linkAlm.UsuarioID = magma
        //console.log("Datos Usuario guardados")

        var copy = [];
        await db.collection('Alumno').add(linkAlm).then(docRef=>{
            copy.push(docRef.id)
            })
       // var nom = linkAlm.Nombre
      //  console.log(copy)
        //console.log("Datos Alumno guardados");
        
        if(props.isnested !== undefined){
            const message={
                id : copy[0],
                Nombre : linkuser.Nombre,
                Apellido : linkuser.Apellido
            }
            //console.log(message)
            props.enviarID(message)
        }

       /* db.collection('ManagerColegio').doc(props.id_mayor).get().then(querySnapshot =>{
            querySnapshot.forEach(element => {
                if(element.id===props.id_mayor){
                    element.Alum_list.push(idus)
                    db.collection('ManagerColegio').id(props.id_mayor).update(element)
                }                
            });
        })*/
  // setidus('');
    }

    return(
        <div>Crear Alumno
            <CreEditAlm {...{addOrEdit,}}/> 
        </div>
    )

}
export default CreateAlm