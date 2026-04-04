import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext.jsx'
const UserSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = React.useContext(UserDataContext)
  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      )
      setUser(response.data.user)
      navigate('/home')

    } catch (error) {
      console.log(error)
    }
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-36 ml-0" src="/finalLogo.png" alt="Drivigo" />

        <form onSubmit={submitHandler}>

          <h3 className='text-xl mb-2'>What's your name</h3>

          <div className='flex gap-4 mb-5'>
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border-white w-1/2 text-lg'
              type="text"
              placeholder='First name'
            />

            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border-white w-1/2 text-lg'
              type="text"
              placeholder='Last name'
            />
          </div>

          <h3 className='text-xl mb-2'>What's your email</h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border-white w-full text-lg'
            type="email"
            placeholder='example@email.com'
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

          <button className='bg-[#111] mb-5 text-white rounded px-4 py-2 w-full text-lg'>
            Create Account
          </button>

          <p className='text-center'>
            Already have an account?{" "}
            <Link to='/login' className='text-blue-400'>
              Login here
            </Link>
          </p>

        </form>
      </div>

      <div>
        <Link
          to='/captain-signup'
          className='bg-[#10b461] flex items-center justify-center mb-7 text-white rounded px-4 py-2 w-full text-lg'
        >
          Sign up as captain
        </Link>
      </div>
    </div>
  )
}

export default UserSignup