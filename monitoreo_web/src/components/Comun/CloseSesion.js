import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

const CloseSesion = () => {
    const hist = useHistory()
    const cookies = new Cookies()

        
        
        function cerrar(){
            hist.push('/Home')
            //cookies.remove('id_mayor')
            //cookies.remove('idPerm')
        }
        console.log(cookies.getAll())

        return(cerrar());
        //window.location.reload()
} 

export default CloseSesion