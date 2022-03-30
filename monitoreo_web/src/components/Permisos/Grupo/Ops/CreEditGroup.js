import React, {useState, useEffect} from 'react';
import { db } from '../../../../firebase-config';
import Listar from '../../../Comun/listar';
import ExViewPerm from '../../Simple/Ops/ExViewPerm';

const CreEditGroup = (props) => {

    const valores_iniciales = {
        Nombre_G_Perm:'',
        Permisos:[],
        };

        const [rev,setrev]=useState(true);
        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales de la rutina
        const [nomlist,setnomList]=useState([]);
        const [lista,setlista]=useState([])
        const [idP,setIdP]= useState([])


        const setIdAdc = (id,nam)=>{
            if(values.Permisos.includes(id)){
                const index = idP.indexOf(id);
                if (index > -1) {
                    values.Permisos.splice(index, 1);
                }
            }else{
                values.Permisos.push(id);
            }
            
            addNom(nam);    
        }
    
        const listarEjer = async () =>{ //Rescate on Demand de los Documentos en Firestore
            db.collection("Permiso").onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id:doc.id});
                });
                setlista(docs);
            });
            
        }

        useEffect(()=>{
            values.Permisos=turnArray()
            listarEjer()
        },[])
        
        const addNom = async (id) =>{
            var auxnom = [...nomlist];
            if(auxnom.includes(id)){
                const index = auxnom.indexOf(id);
                if (index > -1) {
                    auxnom.splice(index, 1);
                }
                setnomList(auxnom)
            }else{
                    nomlist.push(id);
                }
            setrev(!rev);
        }
    
            const fillNombres = () =>{
                lista.map(alfa=>{
                    idP.map(beta=>{
                        if(!(alfa.id.localeCompare(beta))){
                            if(!(nomlist.includes(alfa.DescripcionPermiso))){
                                nomlist.push(alfa.DescripcionPermiso);
                            }}})})
                setrev(!rev);
            }

            useEffect(()=>{
                if(props.idEx!==''){fillNombres();}
            },[idP])
    
            //-----------------------------------------------------------------------------------
            const manipId = async (id) => {    //Actualizacion de datos en form en base al id
                await db.collection('G_Permiso').doc(id).get().then((doc)=>{
                setValues({...doc.data()})
                setIdP(doc.data().Permisos)
            })
                fillNombres();
            }
    
            useEffect(()=> {                  //Validacion si se a llegado con el id de una rutina
                if (props.idEx === ''){
                    setValues({...valores_iniciales});
                }else{
                    values.Permisos=turnArray()
                    manipId(props.idEx);
                   }
            },[props.idEx])
    
    
            const turnArray = () =>{
                const array = []
                array.push('2')
                array.pop()
                return array
            }
            
            const lector = (e) =>{              //Escritura de valores on-Demand de la rutina que se EDITA
                const {name, value} = e.target;
                setValues({...values, [name]: value})
            }
         
    
            const actualizar = (e) =>{
                e.preventDefault();    
                //console.log(values.Permisos.length)
                if(values.Permisos.length>=1){
                props.addOrEdit(values);
                setValues   ({...valores_iniciales})
                setnomList([])
                //console.log(nomlist);
            }else{
                alert('Debe agregar al menos un permiso a este grupo')
            }
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
    
                })
                setrev(!rev);
            }
            
            useEffect(()=>{
                if(props.idEx!==''){fillNombres();}
            },[values.Permisos])

        return (<>
        <div className='card-body-view'>
            <form className="card card-body" onSubmit={(e)=>{actualizar(e)}} >
                <div className="form-group">
                    <input 
                    type="text"
                    required 
                    autocomplete="off"
                    className="form-control" 
                    placeholder="Nombre del Grupo" 
                    name="Nombre_G_Perm" 
                    onChange={lector}
                    value= {values.Nombre_G_Perm}                   
                    />
                </div>
                    <h5>Permisos en el Grupo</h5>
                    <Listar list={nomlist}/>
                    <br />
                    <br />
               

                <button className="btn btn-primary btn-block">{
                    props.idEx === ''? 'Guardar' : 'Actualizar'
                }</button>
            </form>
            </div>
            <div>
                   
               </div>
            <ExViewPerm enviarID={setIdAdc}/>
            </>
        )
    
};

export default CreEditGroup