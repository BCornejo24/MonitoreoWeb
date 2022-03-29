import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as GoIcons from 'react-icons/go';



export const BarraDatProf = [
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
        block:'ManagerColegio_B',
        icon: <AiIcons.AiFillBook />,
        cName: 'nav-text'
    },{
        title:'Rutinas',
        lock:'MRut',
        path:'/MenuRutina',
        icon: <AiIcons.AiOutlineNodeIndex />,
        cName: 'nav-text'
    },{
        title:'Cerrar Sesión',
        lock:'All',
        path:'/',
        icon: <BiIcons.BiLogOut />,
        cName: 'nav-text'
    },
]