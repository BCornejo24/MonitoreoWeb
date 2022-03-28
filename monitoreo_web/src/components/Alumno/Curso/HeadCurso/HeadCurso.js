import React, { Component } from 'react';
import {ItemsCurso} from './ItemsCurso';
import './HeadCurso.css'
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { db } from '../../../../firebase-config';

class HeadCurso extends Component{
    constructor() {
        super();
        this.state = {brand: ''};
      }

 getperm = () =>{
    const cookie = new Cookies()
    this.state.brand=cookie.get('grup')
    /*db.collection('G_Permiso').doc(cookie.get('idPerm')).get().then((snap)=>{
         snap.data().Nombre_G_Perm
      })*/
}
    
    render(){
        this.getperm()
        return(
            <nav className="head">
                <div className= "menuIcon">
                    
                </div>
                <ul className='menu'>
                    {ItemsCurso.map((cat, index) => {
                        
                        return(<>
                        {(this.props.perm===cat.block)? ''
                                :
                                
                            <li key={index+cat.title} className={cat.cName}>
                            <NavLink to={cat.path}>
                                {cat.title}
                            </NavLink>
                            </li>}
                            </>)}
                    )}
                    {}
                    
                </ul>
            </nav>
            

        )
    }
}

export default HeadCurso