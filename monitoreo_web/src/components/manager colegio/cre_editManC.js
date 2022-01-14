/* 
Colegio
Prof_list [] lista de profesores
Cursos_list []
UsuarioID
*/

import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';
import cre_editUser from '../usuarios/cre_editUser';
import ex_viewCurso from './curso/ex_viewCurso';
import createCurso from './curso/createCurso';

const cre_editManC = (props) => {
    const valores_iniciales = {
        Nombre:'',
        Apellido:'',
        Correo:'',
        Estado:'0',
        G_Permisos:''
        };

    const valores_iniciales_tipo={
        //Alumno
        Colegio:'',
        Prof_list:[],
        Cursos_list:[],
        UsuarioID:'',
        }

    
        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('ManagerColegio').doc(id).get();
            setValues({...doc.data()})
        }

        useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.idEx === ''){
                setValuestipe({...valores_iniciales_tipo});
            }else{
                manipId(props.idEx);
            }
        },[props.idEx])

        const [values_tipe, setValuestipe] =  useState(valores_iniciales_tipo); //set de valores iniciales de alumno y autocompletados
        const [values,setValues] = useState(valores_iniciales); //set de valores iniciales de ususario y autocompletados
        const [valcurso,setValcurso] = useState(curso);

      /*  const lector = (e) =>{              //Escritura de valores on-Demand del objeto
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }
*/
    /*    const remitente = (id,e,grado,letra) =>{
            e.preventDefault();
            valcurso.ID = id;
            valcurso.clase = grado+'°'+letra;

        }

*/        const actualizar = (e) =>{          //Seteo de valores default en los campos
            e.preventDefault();
            props.addOrEdit(values, values_tipe, valcurso.ID);
            setValuestipe   ({...valores_iniciales_tipo})         
        }

        

        const recepcion = (linkObject,e) => {
            e.preventDefault();    
            setValues(linkObject);
            props.addOrEdit(values,values_tipe)
            const b = await db.collection('G_Permisos').where('Nombre_G_Perm','==','ManagerColegio').get()
            values.G_Permisos=b.doc[0].id;
            actualizar(e);
        }

        return (<div>
                <h5>Curso Asignado{valcurso.clase===''? "por agregar" : valcurso.clase}</h5>
                {nCurso? 
                <ex_viewCurso enviarID={remitente()}/>
                :
                <cre_editCurso isnested={true} cambio={setnCurso()}/>}
                
                <br />
                <cre_editUser  addOrEdit={recepcion()} idEx={props.idEx}/>
                </div>)
    
};

export default cre_editManC