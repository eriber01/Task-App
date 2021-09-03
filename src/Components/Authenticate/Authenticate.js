import React from 'react'
import FormDataValidation from '../../Services/FormDataValidation'

export default function Authenticate() {

    const ValData = {
        imput1: 'eriber',
        imput2: ' '
    }
    
    const enviar = ()=>{
        FormDataValidation(ValData, 'Login')
    }

    return (
        <div>
            <button onClick={enviar}>adssdf</button>
        </div>
    )
}
