import React from "react";
import Cookies from "universal-cookie";

export function closeSes(){
    
    const cookies = new Cookies()
    

        cookies.remove("id_mayor")
        cookies.remove("idPerm")
        window.location.reload()
      }