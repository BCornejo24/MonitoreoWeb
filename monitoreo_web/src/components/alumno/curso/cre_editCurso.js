/*
Grado
Letra
Año
alumnos
*/
import React, {useState, useEffect} from 'react';
//import { db } from '../../firebase-config';
//import Listar from '../comun/listar';

const Cre_editCurso = (props) => {
    const valores_iniciales = {
        Grado:'',
        Letra:'',
        Ano:'0',
        AlumnoID:[],
        };

        const [rev,setrev]=useState(true);

        const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = dd + '/' + mm + '/' + yyyy;
    
            return today;
        }
/*
        const setIdAdc = (id,e,nam)=>{
            e.preventDefault();
            if(values.AlumnoID.includes(id)){
                const index = values.AlumnoID.indexOf(id);
                if (index > -1) {
                  values.AlumnoID.splice(index, 1);
                }
            }else{
                values.AlumnoID.push(id);
            }
            values.Ano=fechaact();
            
            addNom(nam);
            //console.log(values.Actividades);

        }

        const [nomlist,setnomList]=useState([]);

        const addNom = async (id) =>{
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

        const fillNombres = () =>{
            
            lista.map(alfa=>{
                values.AlumnoID.map(beta=>{
                    if(!(alfa.id.localeCompare(beta))){
                        if(!(nomlist.includes(alfa.Nombre+' '+alfa.Apellido))){
                            nomlist.push(alfa.Nombre+' '+alfa.Apellido);
                        }}})})
            setrev(!rev);
        }

       
        // Funciones de Lista de Ejercicios--------------------------------------------------
        const [lista, setlista] = useState([]);
        const [listb, setlistb] = useState([])

        const compid = () => {
            const docss = [];
            lista.map((a)=>{
                const aux = await db.collection('Usuarios').doc(id).get();
                if(a.id === aux.id){
                    docss.push({...aux.data(), id:aux.id});
                }
            })
            setlistb(docss);
        }


        const listarEjer = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
            db.collection("Alumnos").onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id:doc.id});
                });
                setlista(docs);
            });
            compid();
            
        }

        useEffect(()=>{
            listarEjer();
        }, []);




        //-----------------------------------------------------------------------------------
        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Rutinas').doc(id).get();
            setValues({...doc.data()})
            fillNombres();
        }*/

        useEffect(()=> {                  //Validacion si se a llegado con el id de una rutina
           // if (props.idEx === ''){
                setValues({...valores_iniciales});
            /*}else{
                manipId(props.idEx);
               }*/
        },[props.idEx])



        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales de la rutina

        const lector = (e) =>{              //Escritura de valores on-Demand de la rutina que se EDITA
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }
     

        const actualizar = (e) =>{          //Seteo de valores default en los campos
            e.preventDefault();
            values.Ano=fechaact();
            props.addOrEdit(values);
            setValues   ({...valores_iniciales})
            freenom();
            console.log(nomlist);
        }

       /* const freenom = () =>{
            var aux = nomlist;
            aux.map(val=>{
                if(nomlist.includes(val)){
                const index = nomlist.indexOf(val);
                if (index > -1) {
                  nomlist.splice(index, 1);
                }
            }

            })
            setrev(!rev);
        }
        
        useEffect(()=>{
            if(props.idEx!==''){fillNombres();}
        },[values.Actividades])
*/
        return (
            <form className="card card-body" onSubmit={(e)=>{actualizar(e)}} >
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Grado (I, II, III...)" 
                    name="Grado" 
                    onChange={lector}
                    value= {values.Grado}                   
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Letra" 
                    name="Letra" 
                    onChange={lector}
                    value= {values.Letra}                   
                    />
                </div>
                    <br />
                    <br />
                           
                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
            </form>

        )
    
};

export default Cre_editCurso