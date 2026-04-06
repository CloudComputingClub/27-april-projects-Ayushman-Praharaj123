import React from "react"

import car from "../assets/carlogo.webp"
import moto from "../assets/motolog.webp"
import auto from "../assets/autorickshaw.webp"

const RideOptions = ({ setSelectedRide }) => {

  const rides = [
    {
      type: "UberGo",
      image: car,
      time: "2 mins away",
      seats: 4,
      desc: "Affordable, compact rides",
      price: 193
    },
    {
      type: "Moto",
      image: moto,
      time: "3 mins away",
      seats: 1,
      desc: "Affordable motorcycle rides",
      price: 65
    },
    {
      type: "Auto",
      image: auto,
      time: "3 mins away",
      seats: 3,
      desc: "Auto rides nearby",
      price: 118
    }
  ]

  return (
    <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-xl p-5 z-40">

      <h3 className="text-xl font-semibold mb-4">
        Choose a ride
      </h3>

      <div className="flex flex-col gap-3">

        {rides.map((ride, index) => (

          <div
            key={index}
            onClick={() => setSelectedRide(ride)}
            className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-100 transition"
          >

            <div className="flex items-center gap-3">

              <img
                src={ride.image}
                className="w-16 h-12 object-contain"
                alt={ride.type}
              />

              <div>

                <h4 className="font-semibold text-md">
                  {ride.type}
                </h4>

                <p className="text-sm text-gray-500">
                  {ride.time} • {ride.seats} seats
                </p>

                <p className="text-xs text-gray-400">
                  {ride.desc}
                </p>

              </div>

            </div>

            <h4 className="font-semibold text-lg">
              ₹{ride.price}
            </h4>

          </div>

        ))}

      </div>

    </div>
  )
}

export default RideOptions