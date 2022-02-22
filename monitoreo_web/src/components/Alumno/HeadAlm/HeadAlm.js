import React, { Component } from 'react';
import {ItemsAlumnos} from './ItemsAlm';
import './HeadAlm.css'
import { NavLink } from 'react-router-dom';

class HeadAlumnos extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsAlumnos.map((cat, index) => {
                        return(<li key={index} className={cat.cName}>
                            <NavLink to={cat.path}>
                                {cat.title}
                            </NavLink>
                            </li>
                            )}
                    )}
                    
                </ul>
            </nav>
            

        )
    }
}

export default HeadAlumnos