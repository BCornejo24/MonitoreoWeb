import React, { Component } from 'react';
import {ItemsM_Grupos} from './ItemsM_Grupos';
import './HeadM_Grupos.css'
import { NavLink } from 'react-router-dom';

class HeadM_Grupos extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu-l'>
                    {ItemsM_Grupos.map((cat, index) => {
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

export default HeadM_Grupos