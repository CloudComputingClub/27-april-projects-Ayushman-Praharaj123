import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[userData, setUserData] = useState({})
  const submitHandler = (e) =>{
      e.preventDefault();
      setUserData({
        email:email,
        password:password
      })
      setEmail('')
      setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-36 ml-0" src="/finalLogo.png" alt="Drivigo" />

        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-xl mb-2'>What's Youremail</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)

            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg placeholder:text-base'
            type="email" placeholder='your email' />
          <h3 className='text-xl mb-2'>Enter password </h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-white w-full text-lg placeholder:text-base' type="password" placeholder='password' />
          <button className='bg-[#111] mb-7 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login to your account</button>

          <p>NewHere? <Link to='/signup' className='text-blue-400'>Create New account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/capatin-login' className='bg-[#10b461] flex items-center justify-center mb-7 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign in as captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
