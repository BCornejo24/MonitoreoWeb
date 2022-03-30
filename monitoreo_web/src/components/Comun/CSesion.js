import React, { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

function CSesion(){
let hist = useHistory()

function cerrar() {
    const cookies = new Cookies();

    cookies.remove('id_mayor')
    cookies.remove('idPerm')
    
    setTimeout(() => {  
        hist.push('/')
     }, 2000);
}
    return (cerrar()    
            );

}

export default CSesion

