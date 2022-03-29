import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { db } from "../../../../firebase-config";

function VerAlm (){
    const [lista]     = useState([])
    const [ac,setac] = useState(0)   

    const cookie = new Cookies
    const listarDocumento = async () =>{ //Rescate de ID Alumnos en Firestore
        
        var prof
        console.log(cookie.getAll())
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

  

    useEffect(()=>{
        listarDocumento()
    }, []);

    return (<>
                <h4 className="subtitle-ground">Ver Curso</h4>
                <div className = 'bloqueCuerpo'>
                <h1 >Alumnos</h1>
                <div className="col-md-8">
                    <div className='list-exv-b'>
                    {lista.map((sf)=>(
                            <div className="card mb-1" key={sf.Nombre+sf.Correo}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <h4><b>{sf.Nombre}</b></h4>
                                    </div>
                                <p>Correo :{sf.Correo}      </p>
                                <p>Actividad :{sf.Actividad}      </p>
                                </div>
                            </div>))
                    }
                    </div>
                </div>
                </div>
            </>);

}

export default VerAlm