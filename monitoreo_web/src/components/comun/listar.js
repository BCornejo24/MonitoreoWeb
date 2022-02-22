import React, {useState, useEffect, Component} from 'react';

const Listar = (props) => {
const[mostrar,setmostrar]=useState([]);


useEffect(()=>{
setmostrar(props.list)
},[props.list])




    return(
        <div className="listActiv">
        <ul>   
        {mostrar.map(nombre=>(                      
            <li key={nombre}>{nombre}</li>
        ))}
        
        </ul>
    </div>
    )
}

export default Listar;







