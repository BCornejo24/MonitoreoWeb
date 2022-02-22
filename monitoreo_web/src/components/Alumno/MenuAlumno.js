import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuCurso from './Curso/MenuCurso';
import HeadAlumnos from './HeadAlm/HeadAlm';
import MenuPupilo from './Pupilo/MenuPupilo';


function MenuAlumno() {
    return(
        <div className='menuAlumno'>
            <h1>Menu Alumno</h1>
            <div className='bloqueMenu'>
                    <HeadAlumnos/>
                </div>
                <Routes>
                    
                    <Route path='Pupilos/*'             element={<MenuPupilo/>} />
                    <Route path='MenuCursos/*'               element={<MenuCurso/>}/>
                </Routes>
        </div>
    );
}

export default MenuAlumno