import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

import { auth } from '../../Services/FirebaseConfig'

export default function Header() {

    const [SessionState, setSessionState] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            if(user){
                setSessionState('login')
                //console.log('esta loqueado');
            }else{
                setSessionState(null)
                //console.log('no esta loqueado');
            }
        })
    }, [])

    const Salir = async () =>{
        auth.signOut()
        setSessionState(null)
    }


    return (
        <div>
            <nav className='nav'>

                <ul>
                    <li> <Link className='home' to='/'>Home</Link></li>
                    { SessionState ? 
                        (<li> <Link to='/task'>Task</Link></li>) : (<span></span>)
                    }
                    { SessionState ?
                        (
                            <li><Link onClick={Salir} 
                                className='authenticate' to='/'
                                >Salir</Link>
                            </li>
                        )
                        :
                        (
                            <li> <Link className='authenticate' 
                                to='/authenticate'>Authenticate</Link>
                            </li>
                        )
                    
                    }
                    
                </ul>
            </nav>
        </div>
    )
}
