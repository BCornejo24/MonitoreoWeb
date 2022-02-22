import React, { Component } from 'react';
import {ItemsRutinas} from './ItemsRutinas';
import './HeadRutinas.css'
import { NavLink } from 'react-router-dom';

class HeadRutinas extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsRutinas.map((cat, index) => {
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

export default HeadRutinas