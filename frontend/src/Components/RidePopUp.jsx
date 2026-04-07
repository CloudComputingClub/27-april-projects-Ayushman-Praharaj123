import React from "react"

const RidePopUp = (props) => {

  return (
    <div>

      <h3 className="text-2xl font-semibold mb-5">
        New Ride Request
      </h3>

      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg">

        <div className="flex items-center gap-3">

          <img
            className="h-12 rounded-full"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
          />

          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>

        </div>

        <h5 className="text-lg font-semibold">
          2 KM
        </h5>

      </div>

      <div className="mt-5">

        <p className="mb-3">Pickup: {props.ride?.pickup}</p>
        <p className="mb-3">Destination: {props.ride?.destination}</p>
        <p className="mb-3">Fare: ₹{props.ride?.fare}</p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => props.setRidePopupPanel(false)}
          className="bg-gray-300 w-full py-3 rounded-lg"
        >
          Ignore
        </button>

        <button
          onClick={() => {
            props.setRidePopupPanel(false)
            props.setConfirmRidePopupPanel(true)
          }}
          className="bg-green-600 text-white w-full py-3 rounded-lg"
        >
          Accept
        </button>

      </div>

    </div>
  )
}

export default RidePopUp