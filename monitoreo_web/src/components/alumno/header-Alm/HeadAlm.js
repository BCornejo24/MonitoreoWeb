import React, { Component } from 'react';
import {ItemsRutinas} from './ItemsRutinas';
import './HeadRutinas.css'

class HeadRutinas extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsRutinas.map((item, index) => {
                        return(
                            <li key={index}>
                            <a className={ItemsRutinas.cName} href={item.url}>
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

export default HeadRutinas