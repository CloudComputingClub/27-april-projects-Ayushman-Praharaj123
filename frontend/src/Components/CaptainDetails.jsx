import React from "react"

const CaptainDetails = () => {
  return (
    <div>

      <div className="flex items-center gap-4">

        <img
          className="h-14 w-14 rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
        />

        <div>
          <h4 className="text-xl font-semibold">
            Captain Rahul
          </h4>
          <p className="text-gray-500">
            Toyota Innova • DL 01 AB 1234
          </p>
        </div>

      </div>

      <div className="flex justify-between mt-6">

        <div>
          <h4 className="text-xl font-semibold">₹1200</h4>
          <p className="text-gray-500 text-sm">Today's Earnings</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold">5</h4>
          <p className="text-gray-500 text-sm">Total Rides</p>
        </div>

      </div>

    </div>
  )
}

export default CaptainDetails