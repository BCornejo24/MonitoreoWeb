import React, { Component } from 'react';
import {Items} from './Items';
import './Head.css'

class Head extends Component{
    render(){
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {Items.map((item, index) => {
                        return(
                            <li key={index}>
                            <a className={Items.cName} href={item.url}>
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

export default Head