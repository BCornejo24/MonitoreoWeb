import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';


const Createexer = (props) => {
    const valores_iniciales = {
        Nombre_Ejercicio:'',
        Duracion_Repeticiones:'',
        Instrucciones:'',
        Exigencia:'Por Determinar',
        Metricas:'NA',
        Estado:'1'
        };

        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Ejercicios').doc(id).get();
            setValues({...doc.data()})
        }

        useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.idEx === ''){
                setValues({...valores_iniciales});
            }else{
                manipId(props.idEx);
            }
        },[props.idEx])

        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales y autocompletados

        const lector = (e) =>{              //Escritura de valores on-Demand del objeto
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }



        const actualizar = (e) =>{  
            e.preventDefault();        //Seteo de valores default en los campos
            if(values.Exigencia=='Por Determinar' ||  values.Metricas=='Por Determinar'){
                alert('Debe de elegir, de la lista disponible para la exigencia o el tipo de ejercicio')
            }else{
            props.addOrEdit(values);
            setValues   ({...valores_iniciales})         
        }
        }

        return (
            <form className="card card-body" onSubmit={actualizar} >
                <div className="form-group">
                    <input 
                    type="text"
                    required 
                    autocomplete="off"
                    className="form-control" 
                    placeholder="Nombre del Ejercicio" 
                    name="Nombre_Ejercicio" 
                    onChange={lector}
                    value= {values.Nombre_Ejercicio}                   
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    required
                    autocomplete="off"
                    className="form-control" 
                    placeholder="Ingrese las Instrucciones del ejercicio" 
                    name="Instrucciones" 
                    onChange={lector}
                    value={values.Instrucciones}
                    />
                </div>
                
                <div className="form-group">
                    <input 
                    type="text"
                    required 
                    autocomplete="off"
                    className="form-control" 
                    placeholder=" Ingrese la Duracion o Repeticiones del ejercicio" 
                    name="Duracion_Repeticiones" 
                    onChange={lector}
                    value={values.Duracion_Repeticiones} 
                    />
                </div>

                <div className="form-group">
                    <div>Escoja la Metrica del ejercicio</div>
                    <select id="exEjerc" className="form-control" name="Metricas" onChange={lector}  value={values.Metricas}>
                        <option value="Por Determinar">Por Determinar</option>
                        <option value="Duración">Duración</option>
                        <option value="Repeticiones">Repeticiones</option>
                    </select>
                </div>

                <div className="form-group">
                    <div>Escoja la exigencia del ejercicio</div>
                    <select id="exEjerc" className="form-control" name="Exigencia" onChange={lector}  value={values.Exigencia}>
                        <option value="Por Determinar">Por Determinar</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                    
                </div>
                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
            </form>

        )
    
};

export default Createexer