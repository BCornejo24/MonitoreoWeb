/* 
Colegio
Prof_list [] lista de profesores
UsuarioID
*/

import React, {useState, useEffect} from 'react';
import { db } from '../../../firebase-config';
import CreEditUser from '../../Usuario/OperUs/CreEditUser';

const CreEditManC = (props) => {
    const valores_iniciales_tipo={
        //ManagerColegio
        Colegio:'',
        Prof_list:[],
        UsuarioID:'',
        }
        
        const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
                    
            return dd+'/'+mm+'/'+yyyy;
        }

        const [valuest,setValuest]= useState(valores_iniciales_tipo);
        const [pAux,setPaux]=useState('');
        
        const recPerm = () =>{
            db.collection('G_Permiso').where('Nombre_G_Perm','==','ManagerColegio_B').get().then((querySnapshot)=>{
                querySnapshot.forEach(perm=>{
                    setPaux(perm.id)
                })
            })
        }

        useEffect(()=>{
            recPerm()
        })

        
        const recepcion = (linkObject)=>{
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
            //console.log(aux.G_Permisos)
            props.addOrEdit(aux,valuest)
            setValuest   ({...valores_iniciales_tipo});
        }

        const lector = (e) =>{              //Escritura de valores on-Demand del objeto
            const {name, value} = e.target;
            setValuest({...valuest, [name]: value})
        }
    
    
        return (<div>
                <br />
                <div className="form-group">
                    <input 
                    type="text"
                    required 
                    autocomplete="off"
                    className="form-control" 
                    placeholder=" Colegio" 
                    name="Colegio" 
                    onChange={lector}
                    value={valuest.Colegio} 
                    />
                </div>
                <CreEditUser addOrEdit={recepcion} base={'Manager Colegio'} idEx={props.idEx}/>
                
                </div>)
        
    };

export default CreEditManC