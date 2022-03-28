/*
IMC
*/

import React, {useEffect, useState} from 'react';
import { db } from '../../../../firebase-config';
import CreEditUser from '../../../Usuario/OperUs/CreEditUser'

const CreEditAlm = (props) => {
    const valores_iniciales_tipo={
        //Alumno
        IMC:'0',
        UsuarioID:''
        }
    

    const [valuest]= useState(valores_iniciales_tipo);
    const [Paux,setPaux] = useState('')

    const recPerm = () =>{
        db.collection('G_Permiso').where('Nombre_G_Perm','==','Alumno_B').get().then((querySnapshot)=>{
            querySnapshot.forEach(perm=>{
                setPaux(perm.id)
            })
        })
    }
    
    const recepcionALM = (linkObject)=>{
        //alert(linkObject)
        var aux= {
            Pass: linkObject.Pass,
            Nombre: linkObject.Nombre,
            Apellido:linkObject.Apellido,
            Correo:linkObject.Correo,
            G_Permisos:Paux,
            Habilitado:'1',
            fIngreso: linkObject.fIngreso
            }
        
            if(props.isnested){
                props.enviarID(aux)
               }else{
                props.addOrEdit(aux,valuest)
            }
        
    }


    useEffect(()=>{
        recPerm()
    })


        return (<div>Alumnos
                <br />
                <CreEditUser addOrEdit={recepcionALM} base={'Alumno'}/>
                </div>)
    
};

export default CreEditAlm