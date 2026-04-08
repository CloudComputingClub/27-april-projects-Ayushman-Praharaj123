import { useState } from "react"
import { MdLocationPin, MdMyLocation } from "react-icons/md"
import { FiArrowRight, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"
import MapView from "../Components/MapView"
import LocationSearchPanel from "../Components/LocationSearchPanel"
import RideOptions from "../Components/RideOption"
import ConfirmRidePanel from "../Components/ConfirmRidePanel"
import DriverDetails from "../Components/DriverDetails"

const Home = () => {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [showRideOptions, setShowRideOptions] = useState(false)
  const [selectedRide, setSelectedRide] = useState(null)
  const [confirmRide, setConfirmRide] = useState(false)
  const [showDriver, setShowDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    if (!pickup || !destination) return
    setPanelOpen(false)
    setShowRideOptions(true)
  }

  const closePanel = () => { setPanelOpen(false); setActiveField(null) }
  const handleRideSelect = (ride) => { setSelectedRide(ride); setShowRideOptions(false); setConfirmRide(true) }
  const confirmRideHandler = () => { setConfirmRide(false); setShowDriver(true) }
  const cancelRideHandler = () => { setConfirmRide(false); setSelectedRide(null); setShowRideOptions(true) }

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <MapView className="w-full h-full" />
      </div>

      <div className="absolute top-5 left-5 z-20">
        <img className="w-28 drop-shadow-md" src="/finalLogo.png" alt="Drivigo" />
      </div>

      <div className="absolute top-5 right-5 z-20">
        <Link
          to="/user/logout"
          className="bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:shadow-lg transition-shadow"
        >
          Logout
        </Link>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 md:right-auto md:w-96 md:m-4 md:rounded-3xl bg-white rounded-t-3xl shadow-2xl z-20 transition-all duration-300 ${panelOpen ? 'max-h-[85vh]' : 'max-h-64'} overflow-hidden`}>
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3" />

        <div className="px-5 pt-4 pb-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-900">Find a trip</h4>
            {panelOpen && (
              <button onClick={closePanel} className="text-gray-400 hover:text-gray-700 transition-colors">
                <FiX size={22} />
              </button>
            )}
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <div className="relative">
              <MdMyLocation className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500" size={18} />
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={() => { setPanelOpen(true); setActiveField("pickup") }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-gray-900 focus:bg-white transition-all"
                placeholder="Pickup location"
              />
            </div>

            <div className="relative">
              <MdLocationPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" size={18} />
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => { setPanelOpen(true); setActiveField("destination") }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-gray-900 focus:bg-white transition-all"
                placeholder="Where to?"
              />
            </div>

            {!panelOpen && (
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                Find Ride <FiArrowRight size={16} />
              </button>
            )}
          </form>

          {panelOpen && (
            <>
              <LocationSearchPanel
                activeField={activeField}
                setPickup={setPickup}
                setDestination={setDestination}
                closePanel={closePanel}
                query={activeField === "pickup" ? pickup : destination}
              />
              {pickup && destination && (
                <button
                  onClick={submitHandler}
                  className="w-full mt-4 bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  Find Ride <FiArrowRight size={16} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showRideOptions && <RideOptions setSelectedRide={handleRideSelect} />}

      {confirmRide && selectedRide && (
        <ConfirmRidePanel
          ride={selectedRide}
          pickup={pickup}
          destination={destination}
          confirmRide={confirmRideHandler}
          cancelRide={cancelRideHandler}
        />
      )}

      {showDriver && selectedRide && <DriverDetails ride={selectedRide} />}
    </div>
  )
}

export default Home