import React from 'react'
import './NoLoginPage.css'

export default function NoLoginPage() {
    return (
        <div className='container-no-login'>
            <div>
                <h1>!Umm!</h1>
                <span>No deberias estar aqui si no estas loqueado</span>
                <a href='/authenticate'>Identificarse</a>
            </div>
        </div>
    )
}
