import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { db } from "../../../../firebase-config"

function ExViewCurso (props){
    const [lCur]=useState([])
    const [lsAS,setlsAS]=useState([])
    const [AuxDoc,setAuxDoc]=useState()
    const [rend,setrend]=useState(0)
    const [sec,setsec]=useState(0)

    const cookie = new Cookies

    const listarDocumento = async () =>{ //Rescate de ID Alumnos en Firestore
        const prof=[]
        await db.collection('ManagerColegio').where('UsuarioID','==',cookie.get('id_mayor')).get().then((querySnapshot)=>{
            //await db.collection('ManagerColegio').where('UsuarioID','==','usId').get().then((querySnapshot)=>{
                querySnapshot.forEach(snapshot=>{
            prof.push(...snapshot.data().Prof_list)})
        }).catch((e) => console.log(e))
        
        
        prof.map((aux)=>{
            db.collection('Curso').where("ProfesorID","==",aux).get().then((querySnapshot)=>{ 
                querySnapshot.forEach((doc)=>{
                        lCur.push({...doc.data(), id:doc.id})
                        setrend(lCur.length)
                        })
                });               
        });
        
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

    console.log(cod)
        
    await db.collection('Cursos').where("ProfesorID","==",cod).get().then((querySnapshot)=>{ 
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
                lCur.push({...doc.data(), id:doc.id})
                setrend(lCur.length)
            })
        }); 
    
                       
    lCur.map((curs)=>{
				bringAS(curs.id)		
		})
    //lsAS.map(asg=>recQsec(asg))
    console.log(lsAS)
    }

    function unixTimeToHumanReadable(seconds)
    {
        let ans = "";
        let daysOfMonth = [ 31, 28, 31, 30, 31, 30,
                              31, 31, 30, 31, 30, 31 ];
 
        let currYear, daysTillNow, extraTime,
            extraDays, index, date, month, flag = 0;
 
        daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
        extraTime = seconds % (24 * 60 * 60);
        currYear = 1970;
 
        while (daysTillNow >= 365)
        {
            if (currYear % 400 == 0 ||
               (currYear % 4 == 0 &&
                currYear % 100 != 0))
            {
                daysTillNow -= 366;
            }
            else
            {
                daysTillNow -= 365;
            }
            currYear += 1;
        }
 
        extraDays = daysTillNow + 1;
 
        if (currYear % 400 == 0 ||
           (currYear % 4 == 0 &&
            currYear % 100 != 0))
            flag = 1;

        month = 0; index = 0;
        if (flag == 1)
        {
            while (true)
            {
                if (index == 1)
                {
                    if (extraDays - 29 < 0)
                        break;
 
                    month += 1;
                    extraDays -= 29;
                }
                else
                {
                    if (extraDays -
                        daysOfMonth[index] < 0)
                    {
                        break;
                    }
                    month += 1;
                    extraDays -= daysOfMonth[index];
                }
                index += 1;
            }
        }
        else
        {
            while (true)
            {
                if (extraDays - daysOfMonth[index] < 0)
                {
                    break;
                }
                month += 1;
                extraDays -= daysOfMonth[index];
                index += 1;
            }
        }

        if (extraDays > 0)
        {
            month += 1;
            date = extraDays;
        }
        else
        {
            if (month == 2 && flag == 1)
                date = 29;
            else
            {
                date = daysOfMonth[month - 1];
            }
        }
 
        ans += date.toString();
        ans += "/";
        ans += month.toString();
        ans += "/";
        ans += currYear.toString();
 
        
        return ans;
    }

    const bringAS = async (id) =>{
        var auxcode = id
			await db.collection('Asignado').where('CursoID','==',auxcode).orderBy('timestamp',"desc").limit(1).get().then(async(querySnapshot)=>{
                
/*                querySnapshot.forEach(asg=>{
                    console.log(asg.data())
                    console.log(asg.data())

                    console.log('asg.data().timestamp')
                    console.log(asg.data().timestamp)
                    console.log(unixTimeToHumanReadable(asg.data().timestamp))

                    
                })*/
                var seciones = 0
			if(querySnapshot.empty){
				var valAsign = {
                    id:'',
                    seciones:'sin asignar',
					idCur:auxcode,
					Fecha_Asignada:'Sin Asinacion'					
				};
					lsAS.push(valAsign)	
				}else{querySnapshot.forEach((asg)=>{
                    
                    db.collection('SecionEjercicio').where('AsignadoID','==',asg.id).get().then(
                        querySnapshot=>{
                        
                        var valAsign = {
                            id:asg.id,
                            seciones:querySnapshot.size,
                            idCur:auxcode,
                            Fecha_Asignada:asg.data().Fecha_de_Creacion
                        };
                            lsAS.push(valAsign)
            setrend(lsAS.length+lCur.length)}
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
        lCur.map( Cur => (
            lsAS.map( asg=>( 
                (asg.idCur==Cur.id)?
            <div className="card mb-1" key={Cur.id}>
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
                    <p>Profesor: {Cur.Profesor===''?'':'Asignado'}</p>
                </div>
            </div>:''))))
        
        :
        lCur.map( exer => (
            <div className="card mb-1" key={exer.id+rend}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h4><b>{exer.Grado+'° '+exer.Letra}</b></h4>
                    
                    </div>
                    <p>Alumnos :{exer.AlumnoID.length}</p><p>Periodo :{exer.Ano}</p>
                    <p>Profesor: {exer.Profesor===''?'':'Asignado'}</p>
                </div>
            </div>))


    }</>)

    useEffect(()=>{
        if(props.Prof){
            listarDocumentoProf()
            setrend(lsAS.length+lCur.length+1)
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