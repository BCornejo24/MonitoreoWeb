import React, {useEffect,useState} from "react"
import Cookies from "universal-cookie";
import { db } from "../../../firebase-config";


const ViewProfesor = () =>{
    const [listaUS] = useState([]);
    const [rend,setREND]=useState(0)

    const cookie = new Cookies()

    const bloquearUsuario = async (linkObject,a) =>{   //Eliminacion de rutinas de la base de datos
        if (window.confirm('Esta seguro de que quiere bloquear al Profesor: '+a)){
            linkObject.Habilitado=!linkObject.Habilitado
            await db.collection('Usuarios').doc(linkObject.id).update(linkObject)
            
        }

    };
    

    const listar = () =>{ //Rescate on Demand de los Rutinas en Firestore

        db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            //console.log(querySnapshot)
            querySnapshot.forEach(man=>{
                var profs=man.data().Prof_list

                profs.map((us_p)=>{
                    db.collection('Profesores').doc(us_p).get().then((prof)=>{
                        var code = prof.data().UsuarioID
                        db.collection('Usuarios').doc(code).get().then((us)=>{
                            listaUS.push({...us.data(), id:us.id})
                            setREND(listaUS.length)
                        })
                    })
                })
                
            })

        })
                
    }

    
    

    
    useEffect(()=>{
        listar();
    }, []);

   
    return(<>
        <div className='bloqueCuerpo'>
            <h1>Profesores</h1>
            
            <div className="col-md-view">
                
            {listaUS.map(us=>(
                        <div className="card mb-1" key={us.id+rend}>
                    
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                            <h4><b>{us.Nombre+' '+us.Apellido}</b></h4>
                            <div>
                                <i className="material-icons text-danger" onClick={()=>bloquearUsuario(us,us.Nombre+' '+us.Apellido)} >close</i>
                            </div>
                            </div>
                            <p>Correo :{us.Correo}      </p>
                            <p>Estado :{us.Habilitado? 'Habilitado':'Bloqueado'}</p>
                        </div>
                    </div>

                      ))}

            </div>
        </div>
        </>)

};

export default ViewProfesor