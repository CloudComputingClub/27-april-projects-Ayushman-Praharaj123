import React from 'react'
import bgimage from '../assets/bg.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div
      className="bg-cover  bg-center h-screen pt-8 flex justify-between flex-col w-full"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <img className="w-36 ml-0" src="/finalLogo.png" alt="Drivigo" />

      <div className="bg-white py-4 pb-10 px-4">
        <h2 className="text-3xl font-bold">
          Get Started with Drivigo
        </h2>

        <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5">
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Home