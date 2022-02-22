import React, { Component } from 'react';
import {ItemsMC} from './ItemsMC';
import './HeadMC.css'
import { NavLink } from 'react-router-dom';

class HeadMC extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsMC.map((cat, index) => {
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

export default HeadMC