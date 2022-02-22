import React, { Component } from 'react';
import {ItemsUser} from './ItemsUser';
import './HeadUser.css'
import { NavLink } from 'react-router-dom';

class HeadUser extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsUser.map((cat, index) => {
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

export default HeadUser