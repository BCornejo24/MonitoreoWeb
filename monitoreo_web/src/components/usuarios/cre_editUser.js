/*
    Usuario
Cuenta
Pass
Nombre
Apellido
Correo
Estado
G_Permiso
Ticket []
*/

import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';
import Email from "../comun/email";


const Cre_editUser = (props) => {
    const valores_iniciales = {
        Pass:'',
        Nombre:'',
        Apellidos:'',
        Correo:'',
        G_Permiso:'0',
        Habilitado:'1'
        };

    const passAux ={
        Aux:'',
        antigua:''
    };
const [done,setdone]= useState(false)

    //traer contraseña del usuario
    const igual = () =>{
        if(auxpa.Aux.localeCompare(values.Pass) !== 0){
            alert("Las contraseñas no coinciden");
        }else{
            if(props.idEX!==''){
                const a = db.collection('Usuario').doc(props.idEx).get();
                if(values.Pass.localeCompare(a.Pass)!== 0){
                    return true;
                }else{
                    alert("La contraseña antigua no coincide")
                }
            }return false;
        }
        
    }

        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Usuario').doc(id).get();
            setValues({...doc.data()})
        }

        useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.idEx === ''){
                setValues({...valores_iniciales});
                setauxpa({...passAux});
            }else{
                manipId(props.idEx);
            }
        },[props.idEx])

        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales y autocompletados
        const [auxpa, setauxpa] =useState(passAux)

        const lector = (e) =>{              //Escritura de valores on-Demand del objeto
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }

        const lectorAux = (e) =>{              //Escritura de valores on-Demand del objeto
            const {name, value} = e.target;
            setauxpa({...values, [name]: value})
        }



        const actualizar = (e) =>{          //Seteo de valores default en los campos
            e.preventDefault();
            if(igual()){
                setdone(true)
                props.addOrEdit(values);
                setauxpa    ({...passAux});
                setValues   ({...valores_iniciales});
        }
            
        }

        return (
            <form className="card card-body" onSubmit={actualizar} >
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre del Usuario" 
                    name="Nombre" 
                    onChange={lector}
                    value= {values.Nombre}                   
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Apellidos del Usuario" 
                    name="Apellidos" 
                    onChange={lector}
                    value={values.Apellidos}
                    />
                </div>
                
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder=" Correo del Usuario" 
                    name="Correo" 
                    onChange={lector}
                    value={values.Correo} 
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder=" Contraseña Nueva" 
                    name="Pass" 
                    onChange={lector}
                    value={values.Pass} 
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder=" Repita la contraseña nueva" 
                    name="Aux" 
                    onChange={lectorAux}
                    value={auxpa.Aux} 
                    />
                </div>
                
                {props.idEX?
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder=" Contraseña Antigua" 
                    name="antigua" 
                    onChange={lector}
                    value={passAux.antigua} 
                    />
                </div>:
                <div></div>                
                }


                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
               { done?
                <Email email={values.Correo} message={values.Pass} tname={values.Nombre+' '+values.Apellidos} done={setdone()} tipo={()=>props.idEx? null:'new'}/>: <div></div>}
            </form>

        )
    
};

export default Cre_editUser