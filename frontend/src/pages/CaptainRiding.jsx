import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MdLocationOn, MdLocationPin, MdNavigation } from "react-icons/md"
import { LuIndianRupee } from "react-icons/lu"
import { FiFlag } from "react-icons/fi"
import MapView from "../Components/MapView"
import FinishRide from "../Components/FinishRide"

const CaptainRiding = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const ride = location.state?.ride
  const [showFinish, setShowFinish] = useState(false)
  const finishPanelRef = useRef(null)

  const userName = ride?.user?.fullname?.firstname || "Rider"

  useGSAP(() => {
    gsap.to(finishPanelRef.current, {
      transform: showFinish ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out"
    })
  }, [showFinish])

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapView className="w-full h-full" />
      </div>

      <div className="absolute top-5 left-5 z-20">
        <img className="w-24 drop-shadow-md" src="/finalLogo.png" alt="Drivigo" />
      </div>

      <div className="absolute top-5 right-5 z-20">
        <div className="bg-green-500 text-white rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-md">
          <MdNavigation size={14} />
          <span className="text-xs font-semibold">Ride Active</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-96 md:m-4 md:rounded-3xl bg-white rounded-t-3xl shadow-2xl z-10">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1" />
        <div className="px-5 pt-3 pb-6">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Ride in Progress</h2>
            <div className="flex items-center gap-0.5">
              <LuIndianRupee size={16} className="text-gray-700" />
              <span className="text-xl font-bold text-gray-900">{ride?.fare}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 mb-5">
            <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-400">Passenger</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
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
          </div>

          <button
            onClick={() => setShowFinish(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <FiFlag size={16} />
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishPanelRef}
        className="fixed w-full md:w-96 md:left-4 md:rounded-3xl z-30 bottom-0 translate-y-full bg-white px-5 pt-4 pb-8 shadow-2xl"
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <FinishRide ride={ride} onFinish={() => navigate("/captain-home")} />
      </div>
    </div>
  )
}

export default CaptainRiding