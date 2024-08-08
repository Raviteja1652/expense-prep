import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './Profile.css';
import axios from 'axios';
import AuthContext from '../../Store/AuthContext';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [isComplete, setIsComplete] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [intervalId, setIntervalId] = useState(null)
    const fullNameRef = useRef()
    const photoURLRef = useRef()
    // const ctx = useContext(AuthContext)
    const token = useSelector(state => state.auth.token)

    // console.log('RENDERING NORMAL COMPONENT')

    const getData = useCallback(async () => {
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE', {
                idToken: token
            })
            const data = await res.data
            console.log(data)
            // console.log('RENDERING getData')
            if (data.users[0].displayName) {
                fullNameRef.current.value = data.users[0].displayName
                setIsComplete(true)
            }
            if (data.users[0].emailVerified === true) {
                setEmailVerified(true)
                clearInterval(intervalId)
                setIntervalId(null)
            }
        } catch (error) {
            console.log(error)
        }
    }, [token, intervalId])

    // if getData is used directly in effect function, component renders twice. So defined it outside and enclosed it in useCallback.

    useEffect(() => {
        getData()
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
            // console.log('cleanup funct')
        }
    }, [getData, intervalId])

    const submitHandler = async (e) => {
        e.preventDefault()
        const enteredFullName = fullNameRef.current.value;
        const enteredPhotoURL = photoURLRef.current.value;

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE', {
                idToken: token,
                displayName: enteredFullName,
                photoUrl: enteredPhotoURL,
                returnSecureToken: true
            })
            const data = await response.data
            console.log(data)
            setIsComplete(true)
        } catch (error) {
            console.log(error)
        }
    };
    const verifyEmailHandler = async() => {
        try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE', {
                requestType: "VERIFY_EMAIL",
                idToken: token
            })
            const data = await res.data
            console.log(data.email)
            const id = setInterval(getData, 10*1000)
            setIntervalId(id)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h2>{isComplete ? 'Your Profile is now complete' : 'Your Profile is incomplete. Please complete now'}</h2>
        <form className='profile-form' onSubmit={submitHandler}>
            <section className='input-fields'>
                <label>Full name</label>
                <input type='text' ref={fullNameRef}></input>
                <label>Profile Photo URL</label>
                <input type='text' ref={photoURLRef}></input>
            </section>
            <div className='update-button'>
                <button type='submit'>Update</button>
            </div>
        </form>
        {isComplete && <h2>Great to see you here, {fullNameRef.current.value}</h2>}
        
        {isComplete && !emailVerified && 
            <>
                <h3>Please Verify Your Email</h3>
                <button type='button' onClick={verifyEmailHandler}>Verify Email</button>
            </>
        }
            
        {isComplete && emailVerified && <h3>Your Email is Verified</h3>}
        
    </div>
  )
}

export default Profile;