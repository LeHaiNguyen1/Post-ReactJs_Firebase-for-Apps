import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from './../../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../components/login/Login.css'

export default function Login() {
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      toast(error.code, { type: 'error' })
    }
  }
  return (
    <div>
      <div id="mainCoantiner">
        <div>
          <div class="starsec"></div>
          <div class="starthird"></div>
          <div class="starfourth"></div>
          <div class="starfifth"></div>
        </div>
        <div class="login">
          <div class="form">
            <h2>Welcome</h2>
            <input
              type="email"
              placeholder="Username"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <input
              type="submit"
              value="Sign In"
              class="submit"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
