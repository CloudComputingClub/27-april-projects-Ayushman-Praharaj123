import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { MdRadar } from "react-icons/md"
import MapView from "../Components/MapView"
import CaptainDetails from "../Components/CaptainDetails"
import RidePopUp from "../Components/RidePopUp"
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp"

const dummyRide = {
  _id: "123",
  pickup: "MG Road Metro Station, New Delhi",
  destination: "Cyber Hub, Gurgaon",
  fare: 250,
  otp: "4567",
  user: { fullname: { firstname: "Arjun" } }
}

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride] = useState(dummyRide)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out"
    })
  }, [ridePopupPanel])

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
      ease: "power2.out"
    })
  }, [confirmRidePopupPanel])

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapView className="w-full h-full" />
      </div>

      <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
        <img className="w-24 drop-shadow-md" src="/finalLogo.png" alt="Drivigo" />
      </div>

      <Link
        to="/captain/logout"
        className="absolute top-5 right-5 z-20 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg transition-shadow"
      >
        <RiLogoutBoxRLine size={20} className="text-gray-700" />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-96 md:m-4 md:rounded-3xl bg-white rounded-t-3xl shadow-2xl z-10">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1" />
        <div className="px-5 pt-2 pb-6">
          <CaptainDetails />
          <button
            onClick={() => setRidePopupPanel(true)}
            className="mt-5 w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <MdRadar size={18} />
            Simulate Ride Request
          </button>
        </div>
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed w-full md:w-96 md:left-4 md:rounded-3xl z-30 bottom-0 translate-y-full bg-white px-5 pt-4 pb-8 shadow-2xl"
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full md:w-96 md:left-4 md:rounded-3xl z-30 bottom-0 translate-y-full bg-white px-5 pt-4 pb-8 shadow-2xl"
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome