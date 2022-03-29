/* 
UsuarioID
*/

import React, {useState, useEffect} from 'react';
import { db } from '../../../firebase-config';
import CreEditUser from '../../Usuario/OperUs/CreEditUser';

const CreEditProfesor = (props) => {

        
        const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
                    
            return dd+'/'+mm+'/'+yyyy;
        }

 
        const [pAux,setPaux]=useState('');
        
        const recPerm = () =>{
            db.collection('G_Permiso').where('Nombre_G_Perm','==','Profesor_B').get().then((querySnapshot)=>{
                querySnapshot.forEach(perm=>{
                    //console.log(perm.data())
                    setPaux(perm.id)
                })
            })
        }

        useEffect(()=>{
            recPerm()
        })

        
        const recepcionPRF = (linkObject)=>{
            //alert(linkObject)
            var aux= {
                Pass: linkObject.Pass,
                Nombre: linkObject.Nombre,
                Apellido:linkObject.Apellido,
                Correo:linkObject.Correo,
                G_Permisos:pAux,
                Habilitado:'1',
                fIngreso: linkObject.fIngreso
                }
                
            props.addOrEdit(aux)
            
        }


    
     

        return (<div>
                <CreEditUser addOrEdit={recepcionPRF} base={'Profesor'} />
                
                </div>)
        
    };

export default CreEditProfesor