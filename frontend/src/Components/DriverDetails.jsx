import { MdStar, MdCall, MdMessage } from "react-icons/md"
import { FiNavigation } from "react-icons/fi"

const DriverDetails = ({ ride, captain }) => {
  if (!ride) return null

  const captainName = captain?.fullname?.firstname || "Your Captain"
  const vehicleColor = captain?.vehicle?.color || ""
  const vehicleType = captain?.vehicle?.vehicleType || ride?.type || ""
  const plate = captain?.vehicle?.plate || ""

  return (
    <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-96 md:m-4 md:rounded-3xl bg-white rounded-t-3xl shadow-2xl z-50">
      <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-5" />
      <div className="px-5 pb-6">

        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-bold text-gray-900">Driver arriving</h3>
          <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2 py-1">
            <MdStar className="text-amber-400" size={14} />
            <span className="text-xs font-semibold text-amber-700">4.8</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-5">Your captain is on the way</p>

        <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-5">
          {ride?.image && (
            <img src={ride.image} className="w-20 h-14 object-contain" alt={vehicleType} />
          )}
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">{captainName}</h4>
            <p className="text-sm text-gray-500 mt-0.5 capitalize">{vehicleColor} {vehicleType}</p>
            {plate && (
              <div className="mt-1 bg-gray-200 rounded px-2 py-0.5 inline-block">
                <span className="text-xs font-bold text-gray-700 tracking-wider">{plate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-2xl transition-colors text-sm">
            <MdCall size={18} />
            Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-2xl transition-colors text-sm">
            <MdMessage size={18} />
            Message
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-2xl transition-colors text-sm">
            <FiNavigation size={16} />
            Track
          </button>
        </div>
      </div>
    </div>
  )
}

export default DriverDetails