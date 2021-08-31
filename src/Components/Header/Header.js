import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div>
            <nav className='nav'>

                <ul>
                    <li> <Link className='home' to='/'>Home</Link></li>
                    <li> <Link to='/task'>Task</Link></li>
                    <li> <Link className='authenticate' to='/authenticate'>Authenticate</Link></li>
                </ul>
            </nav>
        </div>
    )
}
