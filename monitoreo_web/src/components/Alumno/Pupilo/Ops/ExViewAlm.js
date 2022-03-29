import React, {useEffect,useState,setState} from "react"
import Cookies from "universal-cookie";
import { db } from "../../../../firebase-config";


//props     cCurso(codigoCurso)     id_mayor(id traida en el inicio de sesion)
const ExViewAlm = (props) =>{
    const [lista]     = useState([]);
    const [listaAL]     = useState([])
    const [ac,setac] = useState(0)
    
    const fecha = () =>{                 //Retorno de Fecha actual para la fecha de creacion
        var today = new Date();
        var yyyy = String(today.getFullYear()-1)
        
        return yyyy;
    }

    const cookie = new Cookies

    
    const listarDocumentoCrear = async () =>{ //Rescate de ID Alumnos en Firestore
        
        var prof
        
        await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            querySnapshot.forEach(snapshot=>{
                prof=snapshot.data().Prof_list        
        
                prof.map((aux)=>{
                        console.log(aux)
                        db.collection('Cursos').where("ProfesorID","==",aux)
                                               .where('Grado','==',getGrado())
                                               .where('Ano','==',fechaact()).get().then((querySnapshot)=>{
                                                console.log(querySnapshot)   
                            querySnapshot.forEach((curso)=>{
                                curso.data().AlumnoID.map(al=>{
                                    db.collection('Alumno').doc(al).get().then(alumno=>{
                                        db.collection('Usuarios').doc(alumno.data().UsuarioID).get().then(usuario=>{
                                            
                                            var saver={
                                                id:usuario.id,
                                                Nombre: usuario.data().Nombre+' '+usuario.data().Apellido,
                                                Correo: usuario.data().Correo,
                                                Actividad: usuario.data().fIngreso,
                                            }
                                            lista.push(saver)
                                            setac(lista.length)

                                        })
                                    })
                                })
                                
                                    })
                            });               
                    });
        })
    })
    }

    const listarDocumento = async () =>{ //Rescate de ID Alumnos en Firestore
        
        var prof
        await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            querySnapshot.forEach(snapshot=>{
                prof=snapshot.data().Prof_list        
        
                prof.map((aux)=>{
                        db.collection('Cursos').where("ProfesorID","==",aux).get().then((querySnapshot)=>{
                            querySnapshot.forEach((curso)=>{
                                curso.data().AlumnoID.map(al=>{
                                    db.collection('Alumno').doc(al).get().then(alumno=>{
                                        db.collection('Usuarios').doc(alumno.data().UsuarioID).get().then(usuario=>{
                                            
                                            var saver={
                                                id:usuario.id,
                                                Nombre: usuario.data().Nombre+' '+usuario.data().Apellido,
                                                Correo: usuario.data().Correo,
                                                Actividad: usuario.data().fIngreso,
                                            }
                                            console.log(saver)
                                            lista.push(saver)
                                            setac(lista.length)

                                        })
                                    })
                                })
                                
                                    })
                            });               
                    });
        })
    })
    }

    const mensaje = (id,nom) => {
        props.enviarID(id,nom)
    }


    const getGrado = () =>{
        if(props.creator=='II')return 'I'
        if(props.creator=='III')return 'II'
        if(props.creator=='IV')return 'III'
    }

    const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
        var today = new Date();
        var yyyy = String(today.getFullYear())
        
        return yyyy-1;
    }
  

    useEffect(()=>{
        if(props.creator){
            listarDocumentoCrear()
        }else{
            listarDocumento()}
    }, []);
 

    /*const mensaje = (id,n,a) =>{
        props.enviarID(id,n,a)
    }*/

    return(<>
                <h1 className="r-dysp">Alumnos</h1>
                <div className="col-md-8">
                    <div className='list-exv'>
                    {lista.map((sf)=>(
                        
                            <div className="card mb-1" key={sf.id+ac}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <h4><b>{sf.Nombre}</b></h4>
                                        <div>
                                            { props.creator? <i className="material-icons text-danger" onClick={()=>{mensaje(sf.id,sf.Nombre)}}>add</i> : ''}
                                        </div>
                                    </div>
                                <p>Correo :{sf.Correo}      </p>
                                <p>Estado :{sf.Actividad}</p>
                                </div>
                            </div>))
                            }
                    </div>
                </div>
    </>)

};

export default ExViewAlm