import React from "react"

const ConfirmRidePanel = ({ ride, pickup, destination, confirmRide, cancelRide }) => {

  return (
    <div className="absolute bottom-0 w-full bg-white p-5 rounded-t-3xl shadow-xl z-40">

      <h3 className="text-xl font-semibold mb-4">
        Confirm your ride
      </h3>

      <div className="flex items-center gap-4 mb-5">

        <img
          src={ride.image}
          className="w-16"
        />

        <div>
          <h4 className="font-semibold text-lg">
            {ride.type}
          </h4>

          <p className="text-sm text-gray-500">
            {ride.seats} seats • {ride.time}
          </p>
        </div>

        <h4 className="ml-auto font-semibold text-lg">
          ₹{ride.price}
        </h4>

      </div>

      <div className="border-t pt-4 space-y-3">

        <p className="text-sm">
          <span className="font-semibold">Pickup:</span> {pickup}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Destination:</span> {destination}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={cancelRide}
          className="flex-1 bg-gray-200 py-3 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={confirmRide}
          className="flex-1 bg-black text-white py-3 rounded-lg"
        >
          Confirm Ride
        </button>

      </div>

    </div>
  )
}

export default ConfirmRidePanel