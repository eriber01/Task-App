import React from 'react'

import './Home.css'

export default function Home() {
    return (
        <div className='home'>
            <h1>Hola</h1>
            <p>Bienvenido Su Aplicacion de Tareas</p>
            <p>Aqui te explicare las Reglas y lo que puedes hacer:</p>

            <ul>
                <li>Puedes agregar tu Tareas pendientes con su respectivo Nombre y Descripcion</li>
                <li>Para agregar Tareas debes estas logueado o resgistrado.</li>
                <li>Las Tareas que Guardes no se Borraran Amenos que TU lo hagas</li>
                <li>Solo puedes ver las tareas guardadas con tu TU Correo</li>
                <li>Si olvidas el Correo o la Contraseña no la puedes recuperar</li>
            </ul>
        </div>
    )
}
