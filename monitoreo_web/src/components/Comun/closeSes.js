import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

export function closeSes(){
    
    const cookies = new Cookies()

        cookies.remove('id_mayor')
        cookies.remove('idPerm')
        
        //console.log(cookies.getAll())

        
        window.location.href = '/Home'
                
      }