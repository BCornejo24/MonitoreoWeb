import React, {useState, useEffect} from 'react';
//import CreateAlm from '../../Pupilo/Ops/CreateAlm'
import Listar from '../../../Comun/listar';
import ExViewAlm from '../../Pupilo/Ops/ExViewAlm'
import { db } from '../../../../firebase-config';
import CreEditAlm from '../../Pupilo/Ops/CreEditAlm';
import Cookies from 'universal-cookie';
import DropOptions from '../../../Comun/DropOptions';

const CreEditCurso = (props) => {
    const valores_iniciales = {
        Grado:'base',
        Letra:'',
        Ano:'0',
        AlumnoID:[],
        ProfesorID:'0'
        };

        const [cAl,setcAl]=useState(false)
        const [nomlist,setnomList]=useState([]);
        const [lus,setLUS]=useState([])
        const [rev,setrev]=useState(true)
        const [liAlN,setLAN]=useState([])
        const [liUsN,setLUN]=useState([])
        const [isDisabled,setIsDisabled]=useState(false)
        const [curG,setcurG]=useState(false)


        const cookie = new Cookies

        const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
            var today = new Date();
            var yyyy = String(today.getFullYear())
            
            return yyyy;
        }

        useEffect(()=> {                  //Validacion si se a llegado con el id de una rutina
           
            setValues({...valores_iniciales});
           
        },[props.idEx])



        const [values, setValues] =  useState(valores_iniciales); //set de valores iniciales de la rutina

        const lector = (e) =>{              //Escritura de valores on-Demand de la rutina que se EDITA
            const {name, value} = e.target;
            setValues({...values, [name]: value})
        }
     

        const actualizar = (e) =>{          //Seteo de valores default en los campos
            if(liAlN.length>1){
            e.preventDefault();
            values.Ano=fechaact();
            values.AlumnoID.push(...lus)
            props.addOrEdit(values,liUsN,liAlN);
            setValues   ({...valores_iniciales})
            setnomList ([])
            setLAN([])
            setLUN([])
            setLUS([])}else{
                alert('Debe de agregar al menos un Alumno al curso')
            }
            
        }

        const nAlumno = (e) =>{
            e.preventDefault()
            setcAl(true)
        }

        const recepcion = (id,a,b) =>{
            
            //console.log("recibi ="+ id +" "+a+" "+b)
            var denom=a+" "+b
            
            var aux=[...lus]

            if(aux.includes(id)){
                const index = aux.indexOf(id);
                if (index > -1) {
                    aux.splice(index, 1);
                }
            }else{
                aux.push(id);
            }

            setLUS(aux)

            addNom(denom)
        }

        const recepcionN = (usr,alm) =>{
            
            liAlN.push(alm)
            liUsN.push(usr)

            var nombre=usr.Nombre+' '+usr.Apellido, code=alm.id

            nomlist.push(nombre)
            values.AlumnoID.push(code)
            setcAl(false)
            
        }

        useEffect(()=>{
            
        },[values.Grado])

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
            setrev(!rev)
            }

         const disabler = (e) =>{
            const {value} = e.target;
            if(value !== "base"){
                setIsDisabled(true)
            }
        }

        return (<div>
            <form className="card card-body" onSubmit={(e)=>{actualizar(e)}} >
                <div className="form-group">
                <select type="text" disabled={isDisabled} className="form-control" name="Grado" onChange={(e)=>{lector(e);disabler(e);setcurG(true)}} value= {values.Grado}>
                        <option color="black" value="base">Elija el Grado</option>
                        <option color="black" value="I">I</option>
                        <option color="black" value="II">II</option>
                        <option color="black" value="III">III</option>
                        <option color="black" value="IV">IV</option>
                    </select>
                    <h5>Una vez Elija el grado del curso, este se bloqueara para cargar la lista de alumnos disponibles</h5>
                </div>
                <div className="form-group">
                    <input 
                    type="text"
                    autocomplete="off"
                    required 
                    className="form-control" 
                    placeholder="Letra" 
                    name="Letra" 
                    onChange={lector}
                    value= {values.Letra}                   
                    />
                </div>
                <select type="text" className="form-control" name="ProfesorID" onChange={lector} value= {values.Grado}>
                    <option value="base">Elija al profesor de este curso</option>
                    {<DropOptions IdManC={cookie.get('id_mayor')}/>}
                </select> 

                    <br />
                    <h5>Alumnos en el Curso</h5>
                    <Listar list={nomlist}/>
                    <br />
                    
                           
                <button className="btn btn-primary btn-block">{
                    props.idEx === undefined? 'Guardar' : 'Actualizar'
                }</button>

            </form>
                <div>
                
                </div>
            <div>{cAl? 
                    <CreEditAlm isnested={true} enviarID={recepcionN}/>
                    :
                    <button onClick={(e)=>nAlumno(e)}>Nuevo Alumno</button>
                }</div>
            <div>
                {curG?
            <ExViewAlm isnested={true} enviarID={recepcion} mid={cookie.get('id_mayor')} Gr={values.Grado} />
            :''}
            </div>
            </div>
            
        )
    
};

export default CreEditCurso