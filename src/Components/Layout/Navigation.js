import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'
import AuthContext from '../../Store/AuthContext'

const Navigation = () => {
    const ctx = useContext(AuthContext)
    const location = useLocation()
    const isProfilePage = location.pathname === '/profile';

    return (
        <header className='header'>
            <div className='logo'>{isProfilePage ? 'Welcome to Expense Tracker' : 'Expense Tracker'}</div>
            <nav>
                <ul>
                    {!ctx.token && <li>
                        <Link to='/'>Login</Link>
                    </li>}
                    {ctx.token && <li>
                        <Link to='/expenses'>Expenses</Link>
                    </li>}
                    {ctx.token && <li>
                        <Link to='/profile'>Profile</Link>
                    </li>}
                    {ctx.token && <li>
                        <button onClick={() => ctx.onLogout()}>Logout</button>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;
