import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';


const CreateRutin = (props) => {
    const valores_iniciales = {
        Nombre_Rutina:'',
        Fecha_de_Creacion:'',
        Puntaje_Total:'0',
        Descripcion:'',
        nActividades:0,
        Actividades:[],
        };
        const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = dd + '/' + mm + '/' + yyyy;
    
            return today;
        }
        const setIdAdc = (id,e,nam)=>{
            e.preventDefault();
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
                values.Actividades.map(beta=>{
                    if(!(alfa.id.localeCompare(beta))){
                        if(!(nomlist.includes(alfa.Nombre_Ejercicio))){
                            nomlist.push(alfa.Nombre_Ejercicio);
                        }}})})
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
        }, []);
        //-----------------------------------------------------------------------------------
        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Rutinas').doc(id).get();
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
                    placeholder="Nombre de la Rutina" 
                    name="Nombre_Rutina" 
                    onChange={lector}
                    value= {values.Nombre_Rutina}                   
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Descripcion" 
                    name="Descripcion" 
                    onChange={lector}
                    value= {values.Descripcion}                   
                    />
                </div>

                <div className="listActiv">
                    <ul>   
                    {nomlist.map(nombre=>(                        
                        <li key={nombre}>{nombre}</li>
                    ))}
                    
                    </ul>
                </div>
                

                <div className="col-md-8">
            <h1>Ejercicios</h1>
            {lista.map( exer => (
                <div className="card mb-1" key={exer.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                        <h4><b>{exer.Nombre_Ejercicio}</b></h4>
                        <div>
                            <button className="material-icons" onClick={(e)=>setIdAdc(exer.id,e,exer.Nombre_Ejercicio)}>add</button>
                        </div>
                        </div>
                        <p>Instrucciones:{exer.Instrucciones}   |   Exigencia:{exer.Exigencia} </p>
                        <p>Duracion/Repeticiones: {exer.Duracion_Repeticiones} minuto/veces</p>
                        <p>Puntaje maximo: {exer.Puntaje_Maximo}   |   Estado: {(exer.exigencia)? "habilitado" : "deshabilitado"}</p>
                    </div>
                </div>

            ))}
            </div>


               
                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
            </form>

        )
    
};

export default CreateRutin