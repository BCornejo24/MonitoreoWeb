import React, {useEffect,useState,setState} from "react"
import Cookies from "universal-cookie";
import { db } from "../../../../firebase-config";


//props     cCurso(codigoCurso)     id_mayor(id traida en el inicio de sesion)
const ExViewAlm = (props) =>{
    const [listaUS]     = useState([]);
    const [listaAL]     = useState([])
    const [ac,setac] = useState(0)   

    const cookie = new Cookies
    const listarDocumento = async () =>{ //Rescate de ID Alumnos en Firestore
        
       //  await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
           await db.collection('ManagerColegio').where('UsuarioID','==','usId').get().then((querySnapshot)=>{
            const prof = []    
            querySnapshot.forEach(snapshot=>{
                    prof.push(...snapshot.data().Prof_list)

                    prof.map((element)=>{
                    
                        db.collection('Curso').where("ProfesorID","==",element).get().then((snapshot)=>{
                            const caso = []
                            snapshot.forEach((doc)=>{
                                caso.push(...doc.data().AlumnoID)
                    
                                caso.map((alfa)=>{
                    
                                        db.collection("Alumno").doc(alfa).get().then(snapshot=>{
                    
                                            const f = snapshot.data().UsuarioID;
                                            listaAL.push({...snapshot.data(), id:snapshot.id})
                    
                                            db.collection('Usuarios').doc(f).get().then((snap)=>{
                                                listaUS.push({...snap.data(), id:snap.id})
                                                setac(listaUS.length)
                                            })
                                        })
                                })
                            })
                        })
                    })
            })
        }).catch((e) => console.log(e))
        console.log('listaUS')
        console.log(listaUS)

        console.log('listaAL')
        console.log(listaAL)

    }

  

    useEffect(()=>{
        listarDocumento()
    }, []);
 

    const mensaje = (id,n,a) =>{
        props.enviarID(id,n,a)
    }

    return(<>
                <h1 className="r-dysp">Alumnos</h1>
                <div className="col-md-8">
                    <div className='list-exv'>
                    {listaUS.map((sf)=>(
                            <div className="card mb-1" key={sf.id+ac}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <h4><b>{sf.Nombre+' '+sf.Apellido}</b></h4>
                                        <div>
                                            { props.isnested? <i className="material-icons text-danger" onClick={()=>{mensaje(sf.id,sf.Nombre,sf.Apellido)}}>add</i> : ''}
                                        </div>
                                    </div>
                                <p>Correo :{sf.Correo}      </p>
                                <p>Estado :{sf.Habilitado? 'Habilitado':'Bloqueado'}</p>
                                </div>
                            </div>))
                            }
                    </div>
                </div>
    </>)

};

export default ExViewAlm