import React, { Component } from 'react';
import {ItemsUser} from './ItemsUser';
import './HeadUser.css'

class HeadUser extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsUser.map((item, index) => {
                        return(
                            <li key={index}>
                            <a className={ItemsUser.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                            )}
                    )}
                    
                </ul>
            </nav>
            

        )
    }
}

export default HeadUser