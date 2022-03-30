import React, { useEffect, useState } from "react"
import { db } from "../../../../firebase-config"

function Prog(props){


const Asg_iniciales = {
    timestamp:'',
    CursoID:'',
    RutinaID:'',
    Fecha_de_Creacion:'',
    };

    const Curso_iniciales = {
        Grado:'base',
        Letra:'',
        Ano:'0',
        AlumnoID:['a'],
        ProfesorID:'0'
        };

    const Rutina_iniciales = {
        Nombre_Rutina:'',
        Fecha_de_Creacion:'',
        Puntaje_Total:'0',
        Descripcion:'',
        nActividades:0,
        Actividades:[],
        Autor:'',
        Estado:'1',
        };

const[detail,setDetail]=useState(false)
const[lAlm,setLAlm]=useState([])
const[Curso,setCurso]=useState(Curso_iniciales)
const[asg,setAsg]=useState([])
const[Rutina,setRutina]=useState(Rutina_iniciales)
const[ejer,setEjer]=useState([])
const[rend,setrend]=useState(0)

const volver = (e) =>{
    e.preventDefault()
    setLAlm([])
    setCurso([])
    setAsg([])
    setRutina([])
    setEjer([])
    setrend(0)
    setDetail(false)
    props.atras()
}

useEffect(()=>{
    if(props.detail){
    busq(props.code)}
},[props.detail])




const busq = async (a) =>{
var aux,auxa,auxb;
await db.collection('Cursos').doc(a).get().then(cur=>{
    aux=cur.data().AlumnoID
})
     

console.log(Curso)
await db.collection('Asignado').where('CursoID','==',a).orderBy('timestamp',"desc").limit(1).get().then(querySnapshot=>{
    querySnapshot.forEach(asgn=>{
        auxa=asgn.id
        auxb=asgn.data().RutinaID
        var valAsign = {
            id:asgn.id,
            Fecha_Asignada:asgn.data().Fecha_Asignada
          };
          asg.push(valAsign)        
    })})

console.log(asg[0])
//rescatarAlm(doc.data().AlumnoID,auxa)

aux.map(e=>{
    //console.log(e)
    db.collection('Alumno').doc(e).get().then(alm=>{
        
        db.collection('Usuarios').doc(alm.data().UsuarioID).get().then(us=>{
            
            db.collection('SecionEjercicio').where('AlumnoID','==',alm.id).where('AsignadoID','==',auxa).orderBy('timestamp',"desc").limit(1).get().then(querySnapshot=>{
                //console.log(querySnapshot)
                if(querySnapshot.empty){
                    var valAsign = {
                               NomAp: us.data().Nombre+' '+us.data().Apellido,
                            TEjercicios:['SinCompletar'],
                            IMC:alm.data().IMC		
                    };                            
                    lAlm.push(valAsign)
                    setrend(lAlm.length)	
                    }
                    else{querySnapshot.forEach((secion)=>{
                        
                                                       
                          var valAsign = {
                            NomAp: us.data().Nombre+' '+us.data().Apellido,
                            TEjercicios:secion.data().Tiempos,
                            IMC:alm.data().IMC
                          };
                          lAlm.push(valAsign)
                          setrend(lAlm.length)}
                        )
                       
                    
                    }
                    
                
                })}
            )
        
    })
})
console.log(lAlm)


var auxact, auxnom
await db.collection('Rutinas').doc(auxb).get().then(rut=>{
    auxnom=rut.data().Nombre_Rutina
    auxact=rut.data().Actividades

})

console.log(Rutina)

auxact.map(e=>{
    db.collection('Ejercicios').doc(e).get().then(eje=>{
        var valAsign = {
            Nombre: eje.data().Nombre_Ejercicio,
            Instrucciones:eje.data().Instrucciones,
            Metrica:eje.data().Metrica,
            Dur_Rep:eje.data().Duracion_Repeticiones,
          };
          ejer.push(valAsign)
          setrend(rend+1)
    })
})
}

const rescatarAlm=async(alfa,id)=>{ //llenar Alm con Objetos {NomAp(obtenido del Alumno),TEjercicios[](obtenido de ultima SesionEjercicio)}

    alfa.map(e=>{
        //console.log(e)
        db.collection('Alumno').doc(e).get().then(alm=>{
            
            db.collection('Usuarios').doc(alm.data().UsuarioID).get().then(us=>{
                
                db.collection('SecionEjercicio').where('AlumnoID','==',alm.id).where('AsignadoID','==',id).orderBy('timestamp',"desc").limit(1).get().then(querySnapshot=>{
                    //console.log(querySnapshot)
                    if(querySnapshot.empty){
                        var valAsign = {
                           		NomAp: us.data().Nombre+' '+us.data().Apellido,
                                TEjercicios:['SinCompletar'],
                                IMC:alm.data().IMC		
                        };                            
                        lAlm.push(valAsign)
                        setrend(lAlm.length)	
                        }
                        else{querySnapshot.forEach((secion)=>{
                            
                                                           
                              var valAsign = {
                                NomAp: us.data().Nombre+''+us.data().Apellido,
                                TEjercicios:secion.data().Tiempos,
                                IMC:alm.data().IMC
                              };
                              lAlm.push(valAsign)
                              setrend(lAlm.length)}
                            )
                           
                        
                        }
                        
                    
                    })}
                )
            
        })
    })
    //console.log(lAlm)
}

return(<>
    <div>
        <div className="card mb-1" >
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h4><b>{Rutina.Nombre_Rutina}</b></h4>
                    <div>
                    <p>Fecha de Rutina asignada "{props.fechaAsg}"</p>
                    <p>Ejercicios:</p>
                    {ejer.map(ex=>
                        <p key={ex.NomAp}>{ex.Nombre}| Instrucciones: {ex.Instrucciones}| Metrica: {ex.Metrica}|  Duracion/Repeticiones: {ex.Dur_Rep}    </p>
                        )}                    
                    </div>
                    <br/>
                    <br/>
                    </div>
                </div>
    </div>
    <div className="divleft">
    <div className="col-md-view-und" >
    
    {lAlm.map((sf)=>(
                        
                        <div className="card mb-1" key={sf.NomAp+sf.IMC}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                <h4 className="topdivleft"><b>{sf.NomAp}</b></h4>
                                    <div className="topdivright">
                                        
                                        <div className="divleft">IMC: {sf.IMC}</div>
                                        <div className="divright">
                                        <p>Tiempos:</p>
                                        <div>
                                            {sf.TEjercicios.map(paragraph => <p>{paragraph}</p>)}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>))
                        }</div>
    </div>
    <div className="divright-b">
    <button  onClick={(e)=>{volver(e)}}>volver</button>
    </div>
    </div>
</>
)


}
export default Prog
