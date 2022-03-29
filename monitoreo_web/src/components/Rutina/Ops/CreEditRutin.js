import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import { db } from '../../../firebase-config';
import Listar from '../../Comun/listar'
import ExViewEjercicios from '../../Ejercicios/ExViewEjercicios';

const CreEditRutin = (props) => {
    const valores_iniciales = {
        Nombre_Rutina:'',
        Fecha_de_Creacion:'',
        Puntaje_Total:'0',
        Descripcion:'',
        nActividades:0,
        Actividades:[],
        Autor:'base',
        Estado:'1',
        };

        const cookie = new Cookies()

        const [rev,setrev]=useState(true);
        const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = dd + '/' + mm + '/' + yyyy;
    
            return today;
        }
        const setIdAdc = (id,nam)=>{
            if(values.Actividades.includes(id)){
                const index = values.Actividades.indexOf(id);
                if (index > -1) {
                  values.Actividades.splice(index, 1);
                }
                values.nActividades-=1
            }else{
                values.Actividades.push(id);
                values.nActividades+=1;
                values.Fecha_de_Creacion=fechaact();
            }
            
            
            addNom(nam);
            console.log(values.Actividades);

        }

        const [nomlist,setnomList]=useState([]);
        const [perm,setPerm]=useState('')

        const addNom = async (id) =>{
            var auxnom = [...nomlist];
            if(auxnom.includes(id)){
                const index = auxnom.indexOf(id);
                if (index > -1) {
                  auxnom.splice(index, 1);
                }
            setnomList(auxnom)
            }else{
                nomlist.push(id);
            }
            setrev(!rev);
            }

        const fillNombres = () =>{
            
            lista.map(alfa=>{
                values.Actividades.map(beta=>{
                    if(!(alfa.id.localeCompare(beta))){
                        if(!(nomlist.includes(alfa.Nombre_Ejercicio))){
                            nomlist.push(alfa.Nombre_Ejercicio);
                        }}})})
            setrev(!rev);
        }

       
        // Funciones de Lista de Ejercicios--------------------------------------------------
        const [lista, setlista] = useState([]);
        const listarEjer = async () =>{ //Rescate on Demand de los Ejercicios en Firestore
            db.collection("Ejercicios").onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id:doc.id});
                });
                setlista(docs);
            });
            
        }

        useEffect(()=>{
            listarEjer();
            rescNPerm()
        }, []);




        //-----------------------------------------------------------------------------------
        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Rutinas').doc(id).get();
            setValues({...doc.data()})
            fillNombres();
        }

        useEffect(()=> {                  //Validacion si se a llegado con el id de una rutina
            if (props.idEx === ''){
                setValues({...valores_iniciales});
            }else{
                manipId(props.idEx);
               }
        },[props.idEx])



        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales de la rutina

        const lector = (e) =>{              //Escritura de valores on-Demand de la rutina que se EDITA
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }
     
        const rescNPerm = async () =>{
            var a
            var doc = await db.collection('G_Permiso').doc(cookie.get('idPerm')).get()
            setPerm(doc.data().Nombre_G_Perm)
            
        }

        const actualizar = (e) =>{          //Seteo de valores default en los campos
            
            
            if(perm=='Profesor_B'){
                values.Autor=cookie.get('id_mayor')
            }
            
            e.preventDefault();
            props.addOrEdit(values);
            setValues   ({...valores_iniciales})
            freenom();
            console.log(nomlist);
        }
            
        

        const freenom = () =>{
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

        return (
        <>
        <div className='card-body-view'>
            <form className="card card-body" onSubmit={(e)=>{actualizar(e)}} >
                <div className="form-group">
                    <input 
                    type="text"
                    required 
                    autocomplete="off"                    
                    className="form-control" 
                    placeholder="Nombre de la Rutina" 
                    name="Nombre_Rutina" 
                    onChange={lector}
                    value= {values.Nombre_Rutina}                   
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text"
                    required 
                    autocomplete="off"
                    className="form-control" 
                    placeholder="Descripcion" 
                    name="Descripcion" 
                    onChange={lector}
                    value= {values.Descripcion}                   
                    />
                </div>
                    <h5>Ejecicio en la Rutina</h5>
                    <Listar list={nomlist}/>
                    <br />
                    <br />
                
                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
            </form>
            </div>
                <ExViewEjercicios enviarID={setIdAdc} />
            
        
            </>
        )
    
};

export default CreEditRutin