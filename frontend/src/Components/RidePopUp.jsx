import { MdLocationOn, MdLocationPin, MdDirectionsCar } from "react-icons/md"
import { LuIndianRupee } from "react-icons/lu"
import { FiX, FiCheck } from "react-icons/fi"

const RidePopUp = ({ ride, setRidePopupPanel, onAccept }) => {
  const userName = ride?.user?.fullname?.firstname || "Rider"

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-bold text-gray-900">New Ride Request</h3>
        <div className="flex items-center gap-1.5 bg-amber-50 rounded-full px-3 py-1.5">
          <MdDirectionsCar size={14} className="text-amber-600" />
          <span className="text-xs font-semibold text-amber-700">2 km away</span>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
        <div className="h-12 w-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-900">{userName}</h2>
          <p className="text-sm text-gray-500">Verified Rider</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-0.5">
            <LuIndianRupee size={16} className="text-gray-900" />
            <span className="text-xl font-bold text-gray-900">{ride?.fare}</span>
          </div>
          <p className="text-xs text-gray-400">Cash</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-green-100 rounded-full p-1.5 shrink-0">
            <MdLocationOn size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Pickup</p>
            <p className="text-sm font-medium text-gray-900">{ride?.pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-red-100 rounded-full p-1.5 shrink-0">
            <MdLocationPin size={16} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Destination</p>
            <p className="text-sm font-medium text-gray-900">{ride?.destination}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setRidePopupPanel(false)}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl transition-colors text-sm"
        >
          <FiX size={18} />
          Ignore
        </button>
        <button
          onClick={onAccept}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm"
        >
          <FiCheck size={18} />
          Accept
        </button>
      </div>
    </div>
  )
}

export default RidePopUp