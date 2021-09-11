import {useEffect, useState}  from 'react'
import './Authenticate.css'
import {useHistory} from 'react-router-dom'

//firebase manage
import { auth } from '../../Services/FirebaseConfig'
import FormDataValidation from '../../Services/FormDataValidation'

export default function Authenticate() {

    const [UserData, setUserData] = useState({
        email: '',
        pass: ''
    })

    const [LoginChange, setLoginChange] = useState(null)

    const History = useHistory()
    const [MessageError, setMessageError] = useState(null)
    const [MessageSuccess, setMessageSuccess] = useState(null)

        //maneja el tiempo que duran los mensajes
        const TimeMessage = ()=>{
            setTimeout(() => {
                setMessageSuccess(null)
                setMessageError(null)
            }, 5000);
        }

    const Register = async (eve)=>{
        eve.preventDefault()

        const FormData = {
            input1: UserData.email,
            input2: UserData.pass
        }

        await FormDataValidation(FormData, 'Login')
            .then(Data=>{
                if(Data.statusValidation === false){
                    setMessageError(Data.mesValidation)
                    
                    if(Data.campo === 1){
                        setUserData({...UserData, email: ''})
                    }else if(Data.campo === 2){
                        setUserData({...UserData, pass: ''})
                    }

                    setMessageSuccess(null)
                    TimeMessage()
                }else{
                    
                    setMessageError(null)
                    TimeMessage()

                    auth.createUserWithEmailAndPassword(UserData.email, 
                        UserData.pass).then( respose =>{
                            History.push('/task')
                        }).catch(error =>{
                            setMessageError(error.message)
                        })
                }
            })
    } 

    const Login = async (eve) =>{
        eve.preventDefault()

        const FormData = {
            input1: UserData.email,
            input2: UserData.pass
        }

        await FormDataValidation(FormData, 'Login')
            .then(Data=>{
                if(Data.statusValidation === false){
                    setMessageError(Data.mesValidation)
                    
                    if(Data.campo === 1){
                        setUserData({...UserData, email: ''})
                    }else if(Data.campo === 2){
                        setUserData({...UserData, pass: ''})
                    }

                    setMessageSuccess(null)
                    TimeMessage()
                }else{
                    
                    setMessageError(null)
                    TimeMessage()

                    auth.signInWithEmailAndPassword(UserData.email, 
                        UserData.pass).then( respose =>{
                            History.push('/task')
                        }).catch(error =>{
                            setMessageError(error.message)
                        })
                }
            })

    }
    const ChangeLogin = ()=>{
        setLoginChange(null)
        //console.log('login');
    }

    const ChangeRegister = ()=>{
        setLoginChange('register')
        //console.log('Register');
    }
    return (
        <div className='container'>
            <div className='form-container'>
                {
                    LoginChange ?
                    (<h1>Registro</h1>)
                    :
                    (<h1>Login</h1>)
                }

                <form onSubmit={LoginChange ? Register : Login} className='form' action="">
                    <input onChange={(eve)=> 
                        setUserData({...UserData, email: eve.target.value})} 
                        className='email' type="text" name="" id="" 
                        placeholder='Ingrese Su Email'
                        required={true}
                        value={UserData.email}
                    />
                    <input onChange={(eve)=>
                        setUserData({...UserData, pass: eve.target.value})} 
                        className='pass' type="password" name="" id="" 
                        placeholder='Ingrese Su Pass'
                        required={true}
                        value={UserData.pass}
                    />

                    <button className='btn-login'>{
                        LoginChange ? ('Register') : ('Login')
                    }</button>
                </form>

                <a onClick={LoginChange ? ChangeLogin : ChangeRegister}
                    className='login-change'>
                    {LoginChange ? ('Estoy Registrado') : ('No Estoy Registrado')}
                </a>
            </div>
            
            {
                MessageError ? 
                (
                    <div className='error-message'>
                        {MessageError}
                    </div>
                )
                :
                (
                    <span></span>
                )
            }
            {
                MessageSuccess ?
                (
                    <div className='success-message'>
                        {MessageSuccess}
                    </div>
                )
                :
                (
                    <span></span>
                )
            }
        </div>
    )
}
