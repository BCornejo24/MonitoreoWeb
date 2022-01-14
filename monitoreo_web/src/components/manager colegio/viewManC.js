import React, {useEffect,useState} from "react"
import ex_viewPerm from "../single/ex_viewPerm";
import cre_editGroups from "./cre_editGroups";
import {db} from '../../firebase-config'


const ManageExer = () =>{
    const [idEx, setidEx] = useState('');
    const [lista, setlista] = useState([]);
    const [idPerm, setidPerm] = useState('');

    const eliminarEjercicio = async (id , name) =>{   //Eliminacion de ejercicio de la base de datos
        if (window.confirm('Esta seguro de que quiere eliminar el grupo de Permisos: "'+name+'"')){
            await db.collection('G_Permiso').doc(id).delete();
        }

    };
    

    const listarManager = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
        db.collection("ManagerColegio").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setlista(docs);
        });
        
    }

    const contarAlumnos = async (alfa) =>{
        const alum = 0;
        alfa.forEach(bravo =>{
            const doc = await db.collection('Cursos').doc(id).get();
            alum+=doc.AlumnoID.lenght();
        }
    )
    return alum;
}

    const recepcionID = (id) =>{
        setidPerm(id);
    }

    useEffect(()=>{
        listarEjer();
    }, []);

    return(
        
        <div>
        { idEx?
            <cre_editGroups {...{addOrEdit, idEx, lista}}/>
            :                                  
            <div className="col-md-8">
            <h1>Grupos de Permisos</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Colegio}</b></h4>
                        <div>
                            <i className="material-icons text-danger" onClick={()=>eliminarEjercicio(exer.id,exer.Nombre_Ejercicio)} >close</i>
                            <i className="material-icons" onClick={()=>setidEx(exer.id)}>create</i>
                        </div>
                        </div>
                        <p>cursos:{exer.Cursos_List.lenght()} Profesores:{exer.Prof_list.lenght()} Alumnos:{exer.Cursos_List}</p>
                    </div>
                </div>
            ))
            }
            </div>}
        </div>
    )

};

export default ManageExer