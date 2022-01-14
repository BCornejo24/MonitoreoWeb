import React, { Component } from 'react';
import {ItemsProf} from './ItemsProf';
import './HeadProf.css'

class HeadProf extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsProf.map((item, index) => {
                        return(
                            <li key={index}>
                            <a className={ItemsProf.cName} href={item.url}>
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

export default HeadProf