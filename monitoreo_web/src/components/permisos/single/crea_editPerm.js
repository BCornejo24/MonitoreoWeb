import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';


const crea_editPerm  = (props) => {
    const valores_iniciales = {
        Desc_Permiso:'',
        };

      /*  const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Permiso').doc(id).get();
            setValues({...doc.data()})
        }*/

        /*useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.idEx === ''){
                setValues({...valores_iniciales});
            }else{
                manipId(props.idEx);
            }
        },[props.idEx])*/

        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales y autocompletados

        const lector = (e) =>{              //Escritura de valores on-Demand del objeto
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }



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
                    placeholder="Descripcion del Permiso" 
                    name="Desc_Permiso" 
                    onChange={lector}
                    value= {values.Desc_Permiso}                   
                    />
                </div>
       

                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
            </form>

        )
    
};

export default crea_editPerm