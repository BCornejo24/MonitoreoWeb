import React, {useEffect,useState} from "react"
import {db} from '../../firebase-config'
import Cre_editCurso from "./cre_editCurso";


const CreateCurso = (props) =>{



    const addOrEdit = async (linkuser) => {   //Escritura en la base de firestore. Se agrega un objeto rutina a la base de datos
           
        const Anno = await db.collection('Cursos').where('Ano','==',linkuser.Ano).get();
        if(Anno !== null){
            const grad = await db.collection('Cursos').where('Grado','==',linkuser.Grado).get();
            if(grad !== null){
                const letter = await db.collection('Cursos').where('Letra','==',linkuser.Letra).get();
                if(letter !== null){
                    alert('El curso que esta intentando crear:'+linkuser.Grado+'°'+linkuser.Letra+" ya existe.")
                }else{
                    const mC = await db.collection('ManagerColegio').doc(props.id_mayor).get();
                    mC.Cursos_list.push(linkuser.id);
                    await db.collection('ManagerColegio').doc(prop.id_mayor).update(mC);
                    await db.collection('Cursos').doc().set(linkuser);
                    if(props.isnested){
                        props.cambio(false);
                    }
                }
            }
        }
    }

    const nocrear = (e) =>{
        e.preventDefault();
        props.cambio(false);
    }


    return(
        <div>
            <Cre_editCurso {...{addOrEdit,}}/> 
            {props.isnested? '' : 
            <button onClick={(e)=>nocrear(e)}>volver</button>
            }
        </div>
    )

};

export default Cre_editCurso;
