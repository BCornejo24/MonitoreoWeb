import React, {useState} from 'react';
import { db } from '../../firebase-config';
import App from '../../App';
import "./styles/LogIn.css";
import Cookies from 'universal-cookie';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

const LogIn = (props) => {

const sesion = {
    id_mayor:'',
    lock:'',
    key:'',
    idPerm:'',
}


const [errorM,setEMess]=useState({})
const [isSub,setISubm] = useState(false)
const [Us,setUs] = useState(sesion)
const [aux,setaux]=useState()

    const lector = (e) =>{              //Escritura de valores on-Demand del objeto
        const {name, value} = e.target;
        setUs({...Us, [name]: value})
    }

    const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today = dd + '/' + mm + '/' + yyyy;
    
      return today;
    }

const inicio = async(e) =>{
    e.preventDefault();

        console.log(Us.lock +" is the lock")
        console.log(Us.key + " is the key")
        await db.collection('Usuarios').where('Correo','==',Us.lock).get().then((querySnapshot)=>{
            if (!querySnapshot.empty) {
                    querySnapshot.forEach(doc=>{
                      if(!doc.data().Habilitado){
                        setEMess({ name: "cred", message: "Credenciales Invalidas" })
                        return null;
                      }
                if(Us.key === doc.data().Pass){
                        Us.id_mayor = doc.id
                        Us.idPerm = doc.data().G_Permisos
                        console.log("Credenciales validas");
                        setEMess({ name: "cred", message: "" })
                        setISubm(true)
                        console.log(Us.id_mayor+" id en login")
                        
                        avanzar()
                }else{    
                    //console.log("Credenciales Invalidas");
                    setEMess({ name: "cred", message: "Credenciales Invalidas" })
                    }    
                })    
            }
            else {
                //console.log("Credenciales Invalidas");
                setEMess({ name: "cred", message: "Credenciales Invalidas" })
            }    
        })
        //if(isSub){}

}

const avanzar = () =>{
    const cookies = new Cookies();
    cookies.set("id_mayor", Us.id_mayor, {path:'./'})
    cookies.set("idPerm",   Us.idPerm,   {path:'./'})
   
    
    console.log(Us.idPerm)
    window.location.reload()
}


const renderErrorM = (name) =>
    name === errorM.name && (
      <div className="error">{errorM.message}</div>
    );

const renderForm = (
    <div className="form">
        <h4>Inicio de Secion</h4>
      <form onSubmit={inicio}>
        <div className="input-container">
          <label>Correo </label>
          <input 
                    type="text" 
                    className="form-control" 
                    placeholder={"Correo del Usuario"} 
                    name="lock" 
                    required
                    autocomplete="off"
                    onChange={lector}
                    value= {Us.lock}                   
                    />
        </div>
        <div className="input-container">
        <label>Contraseña </label>
        <input 
                    type="password" 
                    className="form-control" 
                    required
                    autocomplete="off"
                    placeholder={"*****"} 
                    name="key" 
                    onChange={lector}
                    value= {Us.key}                   
                    />
        </div>
          {renderErrorM("cred")}
        <div className="button-container">
          <input type="submit" value="Iniciar Sesión"/>
        </div>
      </form>
    </div>
  );


    return(
        <div className="app">
            <div className="login-form">
            <div className="title">Aplicacion Monitoreo</div>
            {isSub ? <div>Iniciando secion...</div> : renderForm}
            </div>
        </div>
    )
}
export default LogIn;






