import { useContext } from "react"
import { CaptainDataContext } from "../context/CaptainContext"
import { MdStar, MdDirectionsCar } from "react-icons/md"
import { LuIndianRupee } from "react-icons/lu"
import { FiActivity } from "react-icons/fi"

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  const name = captain?.fullName?.firstName || captain?.fullname?.firstname || "Captain"
  const plate = captain?.vehicle?.plate || "DL 01 AB 1234"
  const vehicleType = captain?.vehicle?.vehicleType || "car"

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="h-14 w-14 rounded-full bg-gray-900 flex items-center justify-center text-white text-xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
            <MdDirectionsCar size={14} />
            <span className="capitalize">{vehicleType}</span>
            <span>•</span>
            <span className="font-medium text-gray-700 tracking-wider">{plate}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2.5 py-1">
          <MdStar className="text-amber-400" size={14} />
          <span className="text-xs font-bold text-amber-700">4.8</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <div className="flex items-center justify-center gap-0.5 mb-1">
            <LuIndianRupee size={14} className="text-gray-600" />
            <span className="text-lg font-bold text-gray-900">--</span>
          </div>
          <p className="text-xs text-gray-400">Earnings</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="text-lg font-bold text-gray-900">--</span>
          </div>
          <p className="text-xs text-gray-400">Rides</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <FiActivity size={16} className="text-green-500" />
          </div>
          <p className="text-xs text-gray-400">Online</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails