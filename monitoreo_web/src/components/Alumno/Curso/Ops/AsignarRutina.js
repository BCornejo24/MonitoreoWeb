import react, { useState } from "react";
import { db } from "../../../../firebase-config";
import ExViewRutin from "../../../Rutina/Ops/ExViewRutin";
import ExViewCurso from "./ExViewCurso";

const AsignarRutina = (props) =>{

    const [menForm,setmenForm]=useState(false)
    const [idCur,setidCur]=useState()
    const [idRut,setidRut]=useState()
    const [deCur,setdeCur]=useState('')
    const [deRut,setdeRut] = useState('')
    const [f,setf]=useState('')

    const valores_iniciales = {
        timestamp:'',
        CursoID:'',
        RutinaID:'',
        Fecha_de_Creacion:'',
        };

        
    const [values,setvalues]= useState(valores_iniciales)

    const recepcionC = (a,nom,f) =>{
        values.CursoID=a
        setdeCur(nom)
        setf(f)
        console.log(f)        
    }

    const recepcionR = (a,nom) =>{
        values.RutinaID=a
        setdeRut(nom)        
    }

    const fechaact = () =>{                 //Retorno de Fecha actual para la fecha de creacion
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = dd + '/' + mm + '/' + yyyy;

        return today;
    }

    const compfech = () =>{
        var fechaInicio = new Date(f).getTime();
        var fechaFin    = new Date(fechaact()).getTime();

        var diff = fechaFin - fechaInicio;

        console.log(diff/(1000*60*60*24))
        return(diff/(1000*60*60*24) );
        }

    const concretar=()=>{
        if(values.CursoID=='' || values.RutinaID==''){
            alert('Debe elegir una Rutina y un Curso para asignarlos')
        }else{
        if(f==fechaact() || compfech()<=6){
            alert('No puede asignar una nueva rutina hasta dentro de 7 dias')
        }else{
            var timestamp = new Date().getTime();
            values.Fecha_de_Creacion= fechaact()
            values.timestamp=timestamp
            console.log(values)
            db.collection('Asignado').doc().set(values)
            setvalues({...valores_iniciales})
    }}
    }
return(<>
    <h4 className="subtitle-ground">Asignar Rutina</h4>
                <div className='Space'>
                <div className = 'bloqueCuerpo-up'>
                    <div className="card-body">
                        <div className="d-flex-justify-content-between">
                        <h4><b>Curso : {deCur}</b><br /><b>Rutina : {deRut}</b></h4>
                        <div>
                            <h4>Concretar asignacion</h4><button onClick={concretar} className="material-icons" >beenhere</button>
                        </div>
                        </div>
                    </div>

                    <br />
                    <br />
                </div>
                </div>
                <div className = 'bloqueCuerpo-B'>
                <div className = 'leftBloq'><ExViewRutin enviarID={recepcionR}/></div>
                <div className = 'rightBloq'><ExViewCurso Prof={true} isnestprof={true} enviarID={recepcionC} /></div>
                    
                
                </div>
</>)

}

export default AsignarRutina