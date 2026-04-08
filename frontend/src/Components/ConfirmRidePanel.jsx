import { MdLocationOn, MdLocationPin, MdPeople, MdAccessTime } from "react-icons/md"
import { FiArrowRight } from "react-icons/fi"

const ConfirmRidePanel = ({ ride, pickup, destination, confirmRide, cancelRide }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-96 md:m-4 md:rounded-3xl bg-white rounded-t-3xl shadow-2xl z-40">
      <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-5" />
      <div className="px-5 pb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Confirm your ride</h3>

        <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-5">
          <img src={ride.image} className="w-20 h-14 object-contain" alt={ride.type} />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-lg">{ride.type}</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1"><MdPeople size={13} />{ride.seats} seats</span>
              <span className="flex items-center gap-1"><MdAccessTime size={13} />{ride.time}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-xl">₹{ride.price}</p>
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
              <p className="text-sm font-medium text-gray-900 leading-snug">{pickup}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-red-100 rounded-full p-1.5 shrink-0">
              <MdLocationPin size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Destination</p>
              <p className="text-sm font-medium text-gray-900 leading-snug">{destination}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={cancelRide}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3.5 rounded-2xl transition-colors text-sm"
          >
            Back
          </button>
          <button
            onClick={confirmRide}
            className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            Book Ride <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePanel