import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login} from "../features/SkillSlice"

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const handle = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }
    const handlelogin = () => {
        dispatch(login({loginData, navigate}))
    }
  return (
    <div>
        <input value={loginData.username} name="username" onChange={handle} />
        <input value={loginData.password} name="password" onChange={handle} />
        <button onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Auth