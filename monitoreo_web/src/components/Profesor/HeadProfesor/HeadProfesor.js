import React, { Component } from 'react';
import {ItemsProfesor} from './ItemsProfesor';
import './HeadProfesor.css'
import { NavLink } from 'react-router-dom';

class HeadProfesor extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsProfesor.map((cat, index) => {
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

export default HeadProfesor