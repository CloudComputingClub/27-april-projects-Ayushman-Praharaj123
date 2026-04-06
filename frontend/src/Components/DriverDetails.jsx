import React from "react"

const DriverDetails = ({ ride }) => {

  if (!ride) return null

  const driver = {
    name: "Rahul Sharma",
    carNumber: "MH12 AB 4521",
    color: "White",
    rating: "4.8"
  }

  return (
    <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-xl p-6 z-50">

      <h3 className="text-xl font-semibold mb-4">
        Driver arriving
      </h3>

      <div className="flex items-center gap-4 mb-4">

        <img
          src={ride.image}
          className="w-20"
        />

        <div>

          <h4 className="text-lg font-semibold">
            {driver.name}
          </h4>

          <p className="text-sm text-gray-500">
            ⭐ {driver.rating}
          </p>

        </div>

      </div>

      <div className="border-t pt-3">

        <p className="text-md font-semibold">
          {driver.carNumber}
        </p>

        <p className="text-sm text-gray-500">
          {driver.color} {ride.type}
        </p>

      </div>

    </div>
  )
}

export default DriverDetails