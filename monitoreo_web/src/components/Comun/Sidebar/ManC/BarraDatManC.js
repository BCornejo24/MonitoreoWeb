import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as GoIcons from 'react-icons/go';



export const BarraDatManC = [
    {
        title:'Inicio',
        lock:'All',
        path:'/Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },{
        title:'Alumno',
        lock:'MAlm',
        path:'/MenuAlumno',
        icon: <AiIcons.AiFillBook />,
        cName: 'nav-text'
    },{
        title:'Profesor',
        lock:'MProf',
        path:'/MenuProfesor',
        icon: <GoIcons.GoMortarBoard />,
        cName: 'nav-text'
    },{
        title:'Cerrar Sesión',
        lock:'All',
        path:'/',
        icon: <BiIcons.BiLogOut />,
        cName: 'nav-text'
    },
]