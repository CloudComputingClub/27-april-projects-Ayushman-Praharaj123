import { useState } from "react"
import axios from "axios"
import { MdLocationOn, MdLocationPin, MdCheckCircle } from "react-icons/md"
import { LuIndianRupee } from "react-icons/lu"
import { FiLoader } from "react-icons/fi"

const FinishRide = ({ ride, onFinish }) => {
  const [loading, setLoading] = useState(false)

  const handleFinish = async () => {
    const token = localStorage.getItem('captainToken')
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end`,
        { rideId: ride?._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (_) {}
    setLoading(false)
    onFinish()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-green-100 rounded-full p-2">
          <MdCheckCircle size={24} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Finish Ride</h3>
          <p className="text-sm text-gray-400">Confirm to complete this trip</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-green-100 rounded-full p-1.5 shrink-0">
            <MdLocationOn size={14} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Pickup</p>
            <p className="text-sm font-medium text-gray-900">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-red-100 rounded-full p-1.5 shrink-0">
            <MdLocationPin size={14} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Destination</p>
            <p className="text-sm font-medium text-gray-900">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <p className="text-sm text-gray-500">Fare collected</p>
          <div className="flex items-center gap-0.5">
            <LuIndianRupee size={16} className="text-gray-900 font-bold" />
            <span className="text-lg font-bold text-gray-900">{ride?.fare}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFinish}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {loading ? <FiLoader className="animate-spin" size={16} /> : 'Complete Ride'}
      </button>
    </div>
  )
}

export default FinishRide