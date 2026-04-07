import React from "react"

const FinishRide = ({ ride }) => {

  return (
    <div>

      <h3 className="text-2xl font-semibold mb-5">
        Finish Ride
      </h3>

      <div className="border p-4 rounded-lg">

        <p className="text-sm text-gray-500">
          Pickup
        </p>

        <h4 className="font-semibold">
          {ride.pickup}
        </h4>

        <p className="text-sm text-gray-500 mt-4">
          Destination
        </p>

        <h4 className="font-semibold">
          {ride.destination}
        </h4>

        <h3 className="text-xl font-semibold mt-5">
          ₹{ride.fare}
        </h3>

      </div>

      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-6"
      >
        Complete Ride
      </button>

    </div>
  )
}

export default FinishRide