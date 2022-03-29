import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import { db } from '../../../firebase-config';
import DropOptions from '../../Comun/DropOptions';


const CreEditUser = (props) => {
    const cookie = new Cookies()
    const valores_iniciales = {
        Pass:'',
        Nombre:'',
        Apellido:'',
        Correo:'',
        G_Permisos:'0',
        Habilitado:'1',
        fIngreso:''
        };

    const passAux ={
        Aux:'',
        antigua:'',
    };

    const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
                
        return dd+'/'+mm+'/'+yyyy;
    }

//const [done,setdone]= useState(false)
const [base,setbase] = useState('Usuario')
    //traer contraseña del usuario
    const igual = () =>{
        if(auxpa.Aux.localeCompare(values.Pass) !== 0){
            alert("Las contraseñas no coinciden");
        }else{
            if(props.edit){
                if(values.Pass.localeCompare(auxpa.antigua)!== 0){
                    return true;
                }else{
                    alert("Las contraseñas no coinciden")
                }
            }return true;
        }
        
    }

        const manipId = async () => {    //Actualizacion de datos en form en base al id
            await db.collection('Usuarios').doc(cookie.get('id_mayor')).get().then(doc=>{
                setValues({...doc.data(), Pass:''})
                values.Pass=''
                auxpa.antigua=doc.data().Pass
        })
        }

        useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.edit){
                manipId();
            }else{
                setValues({...valores_iniciales});
                setauxpa({...passAux});
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
            setauxpa({...auxpa, [name]: value})
        }



        const actualizar = (e) =>{        //Seteo de valores default en los campos
            e.preventDefault();
            if(igual()){
                values.fIngreso=fechaact()
                
                       
                props.addOrEdit(values)
                setValues(valores_iniciales)
                setauxpa(passAux)
            }}
            

        useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.base !== undefined){
                setbase(props.base)
            }else{
                setbase("Usuario")
            }
        })

        return (
            <form className="card card-body" onSubmit={(e)=>actualizar(e)} >
                <div className="form-group">
                    <input 
                    type="text"
                    autoComplete="off"
                    className="form-control" 
                    placeholder={"Nombre del "+base} 
                    name="Nombre" 
                    onChange={lector}
                    value= {values.Nombre}                   
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    autoComplete="off"
                    className="form-control" 
                    required
                    placeholder={"Apellido del "+base} 
                    name="Apellido" 
                    onChange={lector}
                    value={values.Apellido}
                    />
                </div>
                
                <div className="form-group">
                    <input 
                    type="email"
                    autoComplete="off"
                    required 
                    className="form-control" 
                    placeholder={" Correo del "+base} 
                    name="Correo" 
                    onChange={lector}
                    value={values.Correo} 
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="password"
                    required 
                    className="form-control"
                    placeholder=" Contraseña Nueva" 
                    name="Pass" 
                    onChange={lector}
                    value={values.Pass} 
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control"
                    required
                    placeholder=" Repita la contraseña nueva" 
                    name="Aux" 
                    onChange={lectorAux}
                    value={auxpa.Aux} 
                    />
                </div>
                
                {props.edit?
                <div className="form-group">
                    <input 
                    type="password"
                    className="form-control" 
                    placeholder=" Contraseña Antigua" 
                    name="antigua" 
                    onChange={lectorAux}
                    value={auxpa.antigua} 
                    />
                </div>:
                <div></div>                
                }

                {props.base==undefined?
                <div className="form-group">
                   <select type="text" className="form-control" name="G_Permisos" onChange={lector} value= {values.G_Permisos}>
                    <option value="base">Elija el Grupo de Permisos que Asignara</option>
                    {<DropOptions choose={'GP'}/>}
                </select> 
                </div>
                :''}
                <button className="btn btn-primary btn-block">{
                    props.idEx === undefined? 'Guardar' : 'Actualizar'
                }</button>
              
            </form>

        )
    
}

export default CreEditUser