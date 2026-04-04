import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const captainData = {
      email,
      password
    }

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData
      )

      if (response.status === 200) {

        const data = response.data

        setUser(data.captain)

        localStorage.setItem("token", data.token)

        navigate('/home')

      }

    } catch (error) {
      console.log(error)
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-36 ml-0" src="/finalLogo.png" alt="Drivigo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-xl mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg'
            type="email"
            placeholder='your email'
          />
          <h3 className='text-xl mb-2'>Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg'
            type="password"
            placeholder='password'
          />
          <button className='bg-[#111] mb-7 text-white rounded px-4 py-2 w-full text-lg'>
            Login to your account
          </button>

          <p>
            Want to join a fleet?{" "}
            <Link to='/captain-signup' className='text-blue-400'>
              Register as a captain
            </Link>
          </p>

        </form>

      </div>

      <div>

        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center mb-7 text-white rounded px-4 py-2 w-full text-lg'
        >
          Sign in as a User
        </Link>

      </div>

    </div>
  )
}

export default CaptainLogin