/*
CursosEns
UsuarioID
*/

import React, {useState, useEffect} from 'react';
import { db } from '../../firebase-config';
import Cre_editUser from '../usuarios/cre_editUser';
import Listar from '../comun/listar';
import Ex_viewCurso from '../alumno/curso/ex_viewCurso';

const Cre_editProf = (props) => {
    const valores_iniciales = {
        Nombre:'',
        Apellido:'',
        Correo:'',
        Estado:'0',
        G_Permisos:''
        };

    const valores_iniciales_tipo={
        //Profesor
        CursosEns:[],
        UsuarioID:'',
        }



        const manipId = async (id) => {    //Actualizacion de datos en form en base al id
            const doc = await db.collection('Profesores').doc(id).get();
            setValuestipe({...doc.data()});
            doc = await db.collection('Profesores').doc(values_tipe.UsuarioID).get();
            setValues({...doc.data()});
            fillNombres();
        }

        useEffect(()=> {            //Validacion si se a rescatado un id
            if (props.idEx === ''){
                setValues({...valores_iniciales});
                setValuestipe({...valores_iniciales_tipo});
            }else{
                manipId(props.idEx);
            }
        },[props.idEx])

        const [values_tipe, setValuestipe] =  useState(valores_iniciales_tipo); //set de valores iniciales de alumno y autocompletados
        const [values,setValues] = useState(valores_iniciales); //set de valores iniciales de ususario y autocompletados
        const [nomlist,setnomlist] = useState([]);
        const [rev,setrev]= useState(true);
        
        const remitente = (id,e,grado,letra) =>{
            
            //e.preventDefault();
            if(values_tipe.CursosEns.includes(id)){
                const index = values_tipe.CursosEns.indexOf(id);
                if (index > -1) {
                    values_tipe.CursosEns.splice(index, 1);
                }
            }else{
                values_tipe.CursosEns.push(id);
                
            }
            addNom(grado,letra);


        }

        const addNom = async (a,b) =>{
            var auxnom = nomlist;
            var curso = a+''+b;
            if(auxnom.includes(curso)){
                const index = auxnom.indexOf(curso);
                if (index > -1) {
                  auxnom.splice(index, 1);
                }
            }else{
                nomlist.push(curso);
            }
            setrev(!rev);
            
            }

            const [lista, setlista] = useState([]);
            const listar = async () =>{ 
                db.collection("Cursos").onSnapshot((querySnapshot) => {
                    const docs = [];
                    querySnapshot.forEach((doc)=>{
                        docs.push({...doc.data(), id:doc.id});
                    });
                    setlista(docs);
                });
                
            }

            const fillNombres = () =>{                  // llenado de datos de nomlist cuando existe in id para su exibicion en pantalla
                
                lista.map(alfa=>{
                    values_tipe.CursosEns.map(beta=>{
                        var aux = alfa.grado+''+alfa.letra;
                        if(!(aux.localeCompare(beta))){
                            if(!(nomlist.includes(aux))){
                                nomlist.push(aux);
                            }}})})
                setrev(!rev);
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
                setrev(!rev);
                })
            }

        const actualizar = (e) =>{          //Seteo de valores default en los campos
            //e.preventDefault();
            setValuestipe   ({...valores_iniciales_tipo}) ;
            setValues({...valores_iniciales});
            freenom();
            setrev(!rev);        
        }

        const recepcion = (linkObject,e) => {
            //e.preventDefault();    
            setValues(linkObject);
            //const b =  db.collection('G_Permisos').where('Nombre_G_Perm','==','Profesor').get()
            //values.G_Permisos=b.docs[0].id;
            props.addOrEdit(values,values_tipe)
            actualizar(e);
        }

        return (<div>
                <h5>Cursos Asignados</h5>
                    <Listar list={nomlist}/>
                    <br />
                    <br />
                    <Ex_viewCurso enviarID={remitente()}/>
                    <br />
                    <Cre_editUser  addOrEdit={recepcion()} idEx={props.idEx}/>
                </div>)
    
};

export default Cre_editProf;