import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.css';
import axios from 'axios';
import AuthContext from '../../Store/AuthContext';

const Profile = () => {
    const [isComplete, setIsComplete] = useState(false)
    const fullNameRef = useRef()
    const photoURLRef = useRef()
    const ctx = useContext(AuthContext)

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE', {
                    idToken: ctx.token
                })
                const data = await res.data
                // console.log(data)
                if (data.users[0].displayName) {
                    fullNameRef.current.value = data.users[0].displayName
                    setIsComplete(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [ctx.token])

    const submitHandler = async (e) => {
        e.preventDefault()
        const enteredFullName = fullNameRef.current.value;
        const enteredPhotoURL = photoURLRef.current.value;

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE', {
                idToken: ctx.token,
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
    </div>
  )
}

export default Profile;