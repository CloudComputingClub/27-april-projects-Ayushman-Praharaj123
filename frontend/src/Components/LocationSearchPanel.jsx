import React from "react"
import { IoLocationSharp } from "react-icons/io5"

const locations = [
  "Times Square, New York",
  "Central Park, New York",
  "Brooklyn Bridge",
  "Empire State Building",
  "Wall Street"
]

const LocationSearchPanel = ({ activeField, setPickup, setDestination, closePanel }) => {

  const selectLocation = (location) => {

    if (activeField === "pickup") {
      setPickup(location)
    } else {
      setDestination(location)
    }

    closePanel()
  }

  return (
    <div className="mt-6 flex flex-col gap-4">

      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => selectLocation(location)}
          className="flex items-center gap-4 border p-3 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <IoLocationSharp size={22} />
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}

    </div>
  )
}

export default LocationSearchPanel