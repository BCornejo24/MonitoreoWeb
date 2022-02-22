import React, { Component } from 'react';
import {ItemsPermisos} from './ItemsPermisos';
import './HeadPermisos.css'
import { NavLink } from 'react-router-dom';

class HeadPermisos extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsPermisos.map((cat, index) => {
                        return(<li key={index} className={cat.cName}>
                            <NavLink to={cat.url}>
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

export default HeadPermisos