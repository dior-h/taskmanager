import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { addNewUserMutation, useAddNewUserMutation } from '../users/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {

    const errRef = useRef()
    const [errMsg, setErrMsg] = useState('')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = useLoginMutation()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    const tryLogin = (async () => {
        if (isSuccess) {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        }
    })

    useEffect(() => { tryLogin() }, [ isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className='body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style={{fontFamily:"Lato,sans-serif"}}'>
        
            <p className={errClass}>{error?.data?.message}</p>

            <div className="max-w-max mx-auto p-8 bg-gray-800 rounded-md shadow-md form-container">
                <h2 className="text-2xl font-semibold text-white mb-6">Register!</h2>
                <form onSubmit={onSaveUserClicked}>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                        Username</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-gray-300 text-sm font-bold mb-2">Confirm password</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />
                </div>

                <button type="submit" title="Save" disabled={!canSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                    Save
                </button>
                </form>
            </div>
        </section> 
    )

    return content
}

export default Register
