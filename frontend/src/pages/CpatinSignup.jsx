import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'



const CaptainSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const navigate = useNavigate()
  const {setUser}= useContext(UserDataContext)
  const submitHandler = async (e) => {
    e.preventDefault()

    const captainData = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
     try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        captainData
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
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>

        <img className="w-36 mb-10" src="/finalLogo.png" alt="Drivigo" />

        <form onSubmit={submitHandler}>

          <h3 className='text-lg mb-2'>What's your name</h3>

          <div className='flex gap-4 mb-5'>
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='First name'
            />

            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='Last name'
            />
          </div>

          <h3 className='text-lg mb-2'>Email</h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg'
            type="email"
            placeholder='example@email.com'
          />

          <h3 className='text-lg mb-2'>Password</h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg'
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg mb-2'>Vehicle Information</h3>

          <div className='flex gap-4 mb-5'>
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='Vehicle Color'
            />

            <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='Vehicle Plate'
            />
          </div>

          <div className='flex gap-4 mb-7'>

            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg'
              type="number"
              placeholder='Capacity'
            />

            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg'
            >
              <option value="">Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>

          </div>

          <button className='bg-[#111] text-white rounded px-4 py-2 w-full text-lg mb-5'>
            Create Captain Account
          </button>

          <p className='text-center'>
            Already have an account?{" "}
            <Link to="/capatin-login" className='text-blue-400'>
              Login
            </Link>
          </p>

        </form>
      </div>

      <div>
        <Link
          to="/signup"
          className='bg-[#d5622d] flex items-center justify-center text-white rounded px-4 py-2 w-full text-lg'
        >
          Sign up as User
        </Link>
      </div>

    </div>
  )
}

export default CaptainSignup