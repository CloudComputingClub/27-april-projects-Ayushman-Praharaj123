import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const ConfirmRidePopUp = (props) => {

  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    navigate("/captain-riding", {
      state: { ride: props.ride }
    })
  }

  return (
    <div>

      <h3 className="text-2xl font-semibold mb-5">
        Enter OTP to Start Ride
      </h3>

      <form onSubmit={submitHandler}>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="bg-gray-200 px-6 py-4 rounded-lg w-full"
        />

        <button className="w-full mt-5 bg-green-600 text-white p-3 rounded-lg">
          Start Ride
        </button>

      </form>

    </div>
  )
}

export default ConfirmRidePopUp