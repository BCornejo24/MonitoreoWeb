import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';
import ex_viewPerm from '../single/ex_viewPerm';
import Listar from '../../comun/listar';


const cre_editGroups = (props) => {
    const valores_iniciales = {
        Nombre_G_Perm:'',
        Permisos:[],
        };

        const setIdAdc = (id,e,nam)=>{          //Agregar valores al array del objeti, si ya existen los elimina y llama a la funcion addNom con variable nam
            e.preventDefault();
            if(Permisos.includes(id)){
                const index = Permisos.indexOf(id);
                if (index > -1) {
                    Permisos.splice(index, 1);
                }
            }else{
                values.Permisos.push(id);
            }
                       
            addNom(nam);

        }

        const [nomlist,setnomList]=useState([]);

        const addNom = async (id) =>{   // agrega el nombre del ejercicio a nomlist, si ya existe en nomlist lo elimina
            var auxnom = nomlist;
            if(auxnom.includes(id)){
                const index = auxnom.indexOf(id);
                if (index > -1) {
                  auxnom.splice(index, 1);
                }
            }else{
                nomlist.push(id);
            }
            setrev(!rev);            
            }

        const fillNombres = () =>{      // fill inicial de los nombres del array, si se esta editando un grupo
            
            lista.map(alfa=>{
                values.Actividades.map(beta=>{
                    if(!(alfa.id.localeCompare(beta))){
                        if(!(nomlist.includes(alfa.Nombre_Ejercicio))){
                            nomlist.push(alfa.Nombre_Ejercicio);
                        }}})})
        }

       
        // Funciones de Lista de Permisos--------------------------------------------------
     /*   const [lista, setlista] = useState([]);
        const listarEjer = async () =>{ //Rescate on Demand de los Permisos en Firestore
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
        }, []);*/
        //-----------------------------------------------------------------------------------
        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('G_Permiso').doc(id).get();
            setValues({...doc.data()})
        }

        useEffect(()=> {                  //Validacion si se a llegado con el id de una rutina
            if (props.idEx === ''){
                setValues({...valores_iniciales});
            }else{
                manipId(props.idEx);
                console.log(values.Actividades);
                fillNombres();
                console.log(nomlist);
                
            }
        },[props.idEx])

        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales de la rutina

        const lector = (e) =>{              //Escritura de valores on-Demand de la rutina que se EDITA
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }

        const [rev,setrev]=useState(1);

        const actualizar = (e) =>{          //Seteo de valores default en los campos
            e.preventDefault();
            props.addOrEdit(values);
            setValues   ({...valores_iniciales})         
        }



        return (
            <form className="card card-body" onSubmit={actualizar} >
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre del Grupo de Permisos" 
                    name="Nombre_G_Permiso" 
                    onChange={lector}
                    value= {values.Nombre_G_Perm}                   
                    />
                </div>
                
                <Listar list={nomlist}/>
                <ex_viewPerm addNom={enviarID}/>
                
                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
                <button onClick={()=>props.setidEx('')} >volver</button>
            </form>

        )
    
};

export default cre_editGroups