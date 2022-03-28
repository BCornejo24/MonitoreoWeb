import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as GoIcons from 'react-icons/go';



export const BarraDatADM = [
    {
        title:'Inicio',
        lock:'All',
        path:'/Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },{
        title:'Ejercicios',
        lock:'MEje',
        path:'/MenuEjercicios',
        icon: <IoIcons.IoIosBicycle />,
        cName: 'nav-text'
    },{
        title:'Rutinas',
        lock:'MRut',
        path:'/MenuRutina',
        icon: <AiIcons.AiOutlineNodeIndex />,
        cName: 'nav-text'
    },{
        title:'Manager Colegio',
        lock:'MMC',
        path:'/MenuManagerColegio',
        icon: <FaIcons.FaSchool />,
        cName: 'nav-text'
    },{
        title:'Usuario',
        lock:'MUs',
        path:'/MenuUsuario',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text'
    },{
        title:'Permisos',
        lock:'MPerm',
        path:'/MenuPermisos',
        icon: <IoIcons.IoIosCheckmarkCircle />,
        cName: 'nav-text'
    },{
        title:'Cerrar Sesión',
        lock:'All',
        path:'/',
        icon: <BiIcons.BiLogOut />,
        cName: 'nav-text'
    },
]