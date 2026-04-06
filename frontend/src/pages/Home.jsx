import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import LocationSearchPanel from "../Components/LocationSearchPanel"
import RideOptions from "../Components/RideOption"
import DriverDetails from "../Components/DriverDetails"

const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")

  const [panelOpen, setPanelOpen] = useState(false)
  const [activeField, setActiveField] = useState(null)

  const [showRideOptions, setShowRideOptions] = useState(false)
  const [selectedRide, setSelectedRide] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    if (!pickup || !destination) return

    setPanelOpen(false)
    setShowRideOptions(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setActiveField(null)
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">

      <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/o1bNNmgE34Llv5ABeEebZBLoi0z_YSrVQF4zseyr1l8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/NjYyNjQwMi92ZWN0/b3IvaWxsdXN0cmF0/aW9uLW9mLWhhbmQt/aG9sZGluZy1zbWFy/dC1waG9uZS13aXRo/LW5hdmlnYXRpb24t/YXBwLW9uLXNjcmVl/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9X194VFBwbG5j/VGZSQzRreFNRUjlt/dmkxZ0VlbTgzVmN4/RUhVZFMyd2ZuST0"
          alt=""
        />

      <img
        className="w-36 absolute top-5 left-5 z-50"
        src="/finalLogo.png"
        alt="logo"
      />

      <div className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl shadow-xl z-30">

        <div className="flex justify-between items-center mb-4">

          <h4 className="text-2xl font-semibold">
            Find a trip
          </h4>

          {panelOpen && (
            <button onClick={closePanel}>
              <IoClose size={26} />
            </button>
          )}

        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">

          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onFocus={() => {
              setPanelOpen(true)
              setActiveField("pickup")
            }}
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Add pickup location"
          />

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => {
              setPanelOpen(true)
              setActiveField("destination")
            }}
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Add destination"
          />

          <button className="bg-black text-white py-3 rounded-lg">
            Find Ride
          </button>

        </form>

        {panelOpen && (
          <div className="mt-5 max-h-60 overflow-y-auto">
            <LocationSearchPanel
              activeField={activeField}
              setPickup={setPickup}
              setDestination={setDestination}
              closePanel={closePanel}
            />
          </div>
        )}

      </div>

      {showRideOptions && !selectedRide && (
        <RideOptions setSelectedRide={setSelectedRide} />
      )}

      {selectedRide && (
        <DriverDetails ride={selectedRide} />
      )}

    </div>
  )
}

export default Home