import { render } from "@testing-library/react"
import React, { useEffect, useState } from "react"
import { components } from "react-select"
import Cookies from "universal-cookie"
import { db } from "../../../../firebase-config"

function ExViewCurso (props){
    const [lCur,setlCur]=useState([])
    const [lsAS,setlsAS]=useState([])
    
    const [AuxDoc,setAuxDoc]=useState(0)
    const [rend,setrend]=useState(0)
    const [sec,setsec]=useState(props.data)

    const cookie = new Cookies

    const valor_inicial={
        lCurso:[],
        lAsign:[]
    }
    const [value,setvalue]=useState(valor_inicial)
    const listarDocumento = async () =>{ //Rescate de ID Alumnos en Firestore
        var prof
        console.log(cookie.getAll())
        await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            console.log(querySnapshot)
            querySnapshot.forEach(snapshot=>{
                prof=snapshot.data().Prof_list
                //console.log(snapshot.data().Prof_list)
                //prof.push(...snapshot.data().Prof_list)
        
        
        
    prof.map((aux)=>{
        console.log(aux)
            db.collection('Cursos').where("ProfesorID","==",aux).get().then((querySnapshot)=>{ 
                console.log(querySnapshot)
                querySnapshot.forEach((doc)=>{
                    
                    db.collection('Profesores').doc(aux).get().then(profe=>{
                        db.collection('Usuarios').doc(profe.data().UsuarioID).get().then(user=>{
                            lCur.push({...doc.data(), id:doc.id, nProf:user.data().Nombre+' '+user.data().Apellido})
                            setrend(lCur.length)
                        })
                    })    

                        })
                });               
        });})}).catch((e) => console.log(e))
        
    }

    const listarDocumentoProf = async () =>{
        
        
    var cod ;
    await db.collection('Profesores').where('UsuarioID','==',cookie.get('id_mayor')).get().then(querySnapshot=>{
        //await db.collection('ManagerColegio').where('UsuarioID','==','usId').get().then((querySnapshot)=>{
            querySnapshot.forEach(snapshot=>{
                console.log(snapshot.id)
                cod=snapshot.id
            })

    })
        
    await db.collection('Cursos').where("ProfesorID","==",cod).get().then((querySnapshot)=>{ 
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
                value.lCurso.push({...doc.data(), id:doc.id})
                setrend(value.lCurso.length)
            })
        }); 
    
                       
        value.lCurso.map((curs)=>{
				bringAS(curs.id)		
		})
    //lsAS.map(asg=>recQsec(asg))
    console.log(lsAS)
    }

    const bringAS = async (id) =>{
        var auxcode = id
			await db.collection('Asignado').where('CursoID','==',auxcode).orderBy('timestamp',"desc").limit(1).get().then(async(querySnapshot)=>{
                
                
			if(querySnapshot.empty){
				var valAsign = {
                    id:'',
                    seciones:'sin asignar',
					idCur:auxcode,
					Fecha_Asignada:'Sin Asignacion'					
				};
                value.lAsign.push(valAsign)
                    setrend(value.lAsign.length+value.lCurso.length)	
				}else{querySnapshot.forEach((asg)=>{
                    
                    db.collection('SecionEjercicio').where('AsignadoID','==',asg.id).get().then(
                        querySnapshot=>{
                        
                        var valAsign = {
                            id:asg.id,
                            seciones:querySnapshot.size,
                            idCur:auxcode,
                            Fecha_Asignada:asg.data().Fecha_de_Creacion
                        };
                            value.lAsign.push(valAsign)
            setrend(value.lAsign.length+value.lCurso.length)}
                    )
                   
				
				})
				
			}
			})
    }


    const enviar = (id,n,f) => {
        props.enviarID(id,n,f)
    }

    

    const listado=
    (<>{props.Prof?
        value.lCurso.map( Cur => (
            value.lAsign.map( asg=>( 
                (asg.idCur==Cur.id)?
            <div className="card mb-1" key={Cur.id+AuxDoc}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h4><b>{Cur.Grado+'° '+Cur.Letra}</b></h4>
                    <div>
                    <p>Fecha de Rutina asignada "{asg.Fecha_Asignada}"</p>
                    {props.isnestprof? <button className="material-icons" onClick={()=>{enviar(Cur.id,Cur.Grado+'° '+Cur.Letra,asg.Fecha_Asignada)}}>add</button> :''}
                    </div>
                    
                    </div>
                    <p>Seciones realizadas : {asg.seciones}</p>
                    <p>Alumnos :{Cur.AlumnoID.length}</p><p>Periodo :{Cur.Ano}</p>
                    
                </div>
            </div>:''))))
        
        :
        value.lCurso.map( exer => (
            <div className="card mb-1" key={exer.id+rend}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h4><b>{exer.Grado+'° '+exer.Letra}</b></h4>
                    
                    </div>
                    <p>Alumnos :{exer.AlumnoID.length}</p><p>Periodo :{exer.Ano}</p>
                    <p>Profesor: {exer.nProf}</p>
                </div>
            </div>))


    }</>)

    useEffect(()=>{
        if(props.Prof){
            listarDocumentoProf()
            setrend(value.lAsign.length+value.lCurso.length+1)
            setAuxDoc(1)
        }else{
            listarDocumento()
    }
    }, []);

   
    return (<>
                
            <div className='bloqueCuerpo'>
            <h1>Cursos</h1>
            <div className="col-md-view">
            {listado}
            </div>
            </div> 
        </>);

}

export default ExViewCurso