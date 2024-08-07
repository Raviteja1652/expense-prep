import React, { useContext, useRef, useState } from 'react';
// import { useHistory } from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../../Store/AuthContext';
import './AuthForm.css';
import { useDispatch } from 'react-redux';
import { authActions, onLogin } from '../../Store/auth-slice';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const emailRef = useRef()
    const passRef = useRef()
    // const history = useHistory
    // const ctx = useContext(AuthContext)
    const dispatch = useDispatch()

    const toggleHandler = () => {
        setIsLogin(prev => !prev)
    };
    const submitHandler = async (e) => {
        e.preventDefault()
        const enteredEmail = emailRef.current.value
        const enteredPass = passRef.current.value
        const userCred = {
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true
        };
        // const changedMail = enteredEmail.replace('@', '').replace('.', '').replace('.', '')
        const changedMail = enteredEmail.replace(/[@.]/g, '')

        setIsLoading(true)
        let url = ''
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE'
        }

        try {
            const response = await axios.post(url, userCred)
            const data = await response.data
            // console.log(data)
            // ctx.onLogin(data.idToken, changedMail)
            dispatch(onLogin(data.idToken, changedMail))

        } catch (error) {
            alert(error)
            console.log(error)
        }
        setIsLoading(false)

    }

    return (
        <section className='auth'>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label htmlFor='email'>Email id</label>
                    <input type='email' id='email' ref={emailRef} required></input>
                </div>
                <div className='control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' minLength='7' ref={passRef} required></input>
                </div>
                <div className='actions'>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Signup'}</button>}
                    <button type='button' className='toggle' onClick={toggleHandler}>{isLogin ? 'Create new Account' : 'Login with Existing Account'}</button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;
