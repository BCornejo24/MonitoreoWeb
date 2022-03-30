import React, {useState} from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import { NavLink } from "react-router-dom";
import { closeSes } from "../../closeSes";
import '../ADM/BarraLat.css'
import { BarraDatProf } from "./BarraDatProf";

function BarraLatProf(props){

    const [sideBar,setSidebar]=useState('false');

    const cSesion = () =>{
        closeSes()
        setSidebar(false)
    }
    
    const cambioBarra = () => setSidebar(!sideBar)

    return(
        <>
        <div className='navbar'>
            <NavLink to="#" className='menubars'>
                <FaIcons.FaBars className="menuButton" onClick={cambioBarra}/>
            </NavLink>
        </div>
        <nav className={sideBar? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={cambioBarra}>
                <li className="navbar-toggle">
                    <NavLink to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                    </NavLink>
                </li>
                {BarraDatProf.map((cat,index)=>{
                    
                        return(cat.title==='Cerrar Sesión'? 
                        <li key={index} className={cat.cName}>
                                <NavLink onClick={cSesion} to={cat.path}>
                                    {cat.icon}
                                    <span>{cat.title}</span>
                                </NavLink>
                            </li> 
                        :
                            <li key={index} className={cat.cName}>
                                <NavLink to={cat.path}>
                                    {cat.icon}
                                    <span>{cat.title}</span>
                                </NavLink>
                            </li> 
                        )
                }
                
                )}
            </ul>
        </nav>
        </>
    )
}

export default BarraLatProf