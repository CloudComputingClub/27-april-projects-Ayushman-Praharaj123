import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const CaptainRiding = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const ride = location.state?.ride

  return (
    <div className="h-screen flex flex-col">

     
      <div className="flex justify-between items-center p-5">

        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />

        <button
          onClick={() => navigate("/captain-home")}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          End Ride
        </button>

      </div>

      
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      
      <div className="flex-1 p-6 bg-white">

        <h2 className="text-2xl font-semibold mb-6">
          Ride in Progress
        </h2>

        
        <div className="flex items-center gap-4 mb-6">

          <img
            className="h-12 rounded-full"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
          />

          <div>
            <h3 className="text-lg font-medium">
              {ride?.user?.fullname?.firstname}
            </h3>
            <p className="text-gray-500 text-sm">
              Passenger
            </p>
          </div>

        </div>

        
        <div className="border-b py-3">
          <p className="text-gray-500 text-sm">Pickup</p>
          <h4 className="font-medium">{ride?.pickup}</h4>
        </div>

       
        <div className="border-b py-3">
          <p className="text-gray-500 text-sm">Destination</p>
          <h4 className="font-medium">{ride?.destination}</h4>
        </div>

        
        <div className="py-3">
          <p className="text-gray-500 text-sm">Fare</p>
          <h4 className="font-medium text-lg">
            ₹{ride?.fare}
          </h4>
        </div>

        <button
          onClick={() => navigate("/captain-home")}
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-6"
        >
          Finish Ride
        </button>

      </div>

    </div>
  )
}

export default CaptainRiding