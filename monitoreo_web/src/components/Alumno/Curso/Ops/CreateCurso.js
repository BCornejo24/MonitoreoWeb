import React from "react"
import { db } from "../../../../firebase-config";
import CreEditCurso from "./CreEditCurso";


const CreateCurso = () =>{
  
    
    const addOrEdit = async (linkCur,arrus,arral) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
        const niv = linkCur.Grado
        const letr = linkCur.Letra
        const time = linkCur.Ano
        var aux = ''

        var query = db.collection("Curso")
        query = query.where('Ano','==',time)
        query = query.where('Grado','==',niv)
        query = query.where('Letra','==',letr)
        query.get().then(querySnapshot=>{
                if(!querySnapshot.empty){ //falso si encuentra algun documento
                    alert('El curso que esta intentando crear:'+niv+'°'+letr+" ya existe.")
                }else{
                    db.collection('Cursos').doc().add(linkCur)
                   
                    arrus.map((linkus)=>{
                        var pos=0
                        var magma
        
                    db.collection('Usuarios').add(linkus).then(docRef=>{
                       magma=docRef.id
                    })
                    arral[pos].UsuarioID = magma
                    db.collection('Alumno').add(arral[pos])
                    pos++
                    })
                     }})}

   
    return(
        <div>
            <CreEditCurso {...{addOrEdit,}}/>
        </div>
    )

};

export default CreateCurso;
