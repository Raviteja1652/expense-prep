import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'
import { useDispatch, useSelector } from 'react-redux'
import { onLogout } from '../../Store/auth-slice'

const Navigation = () => {
    // const ctx = useContext(AuthContext)
    const location = useLocation()
    const isProfilePage = location.pathname === '/profile';
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(onLogout())
    }

    return (
        <header className='header'>
            <div className='logo'>{isProfilePage ? 'Welcome to Expense Tracker' : 'Expense Tracker'}</div>
            <nav>
                <ul>
                    {!token && <li>
                        <Link to='/'>Login</Link>
                    </li>}
                    {token && <li>
                        <Link to='/expenses'>Expenses</Link>
                    </li>}
                    {token && <li>
                        <Link to='/profile'>Profile</Link>
                    </li>}
                    {token && <li>
                        <button onClick={logoutHandler} >Logout</button>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;
