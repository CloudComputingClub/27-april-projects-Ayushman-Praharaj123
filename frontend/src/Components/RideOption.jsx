import { useState } from "react"
import { MdAccessTime, MdPeople } from "react-icons/md"
import { FiChevronRight } from "react-icons/fi"
import car from "../assets/carlogo.webp"
import moto from "../assets/motolog.webp"
import auto from "../assets/autorickshaw.webp"

const rides = [
  { type: "DriveGo", vehicleType: "car", image: car, time: "2 min", seats: 4, desc: "Affordable, compact rides", price: 193 },
  { type: "Moto", vehicleType: "motorcycle", image: moto, time: "3 min", seats: 1, desc: "Quick motorcycle rides", price: 65 },
  { type: "Auto", vehicleType: "auto", image: auto, time: "3 min", seats: 3, desc: "Auto rides nearby", price: 118 }
]

const RideOptions = ({ setSelectedRide }) => {
  const [selected, setSelected] = useState(null)

  const handleSelect = (ride) => {
    setSelected(ride.type)
    setSelectedRide(ride)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-96 md:m-4 md:rounded-3xl bg-white rounded-t-3xl shadow-2xl z-40">
      <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-4" />
      <div className="px-5 pb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Choose a ride</h3>

        <div className="flex flex-col gap-2">
          {rides.map((ride) => (
            <div
              key={ride.type}
              onClick={() => handleSelect(ride)}
              className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer border-2 transition-all ${
                selected === ride.type
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={ride.image} className="w-16 h-12 object-contain" alt={ride.type} />
                <div>
                  <h4 className="font-bold text-gray-900">{ride.type}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <MdAccessTime size={13} />
                    <span>{ride.time}</span>
                    <span>•</span>
                    <MdPeople size={13} />
                    <span>{ride.seats}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{ride.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">₹{ride.price}</p>
                <FiChevronRight size={16} className="text-gray-400 ml-auto mt-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RideOptions