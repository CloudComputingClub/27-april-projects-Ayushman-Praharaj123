import { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { CaptainDataContext } from "../context/CaptainContext"
import socket from "../socket"
import MapView from "../Components/MapView"
import CaptainDetails from "../Components/CaptainDetails"
import RidePopUp from "../Components/RidePopUp"
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp"

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext)
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  useEffect(() => {
    if (!captain?._id) return

    socket.connect()
    socket.emit('join', { userId: captain._id, role: 'captain' })

    socket.on('new-ride', (incomingRide) => {
      setRide(incomingRide)
      setRidePopupPanel(true)
    })

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        socket.emit('update-location', {
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          rideId: ride?._id || null
        })
      },
      () => {},
      { enableHighAccuracy: true }
    )

    return () => {
      socket.off('new-ride')
      socket.disconnect()
      navigator.geolocation.clearWatch(watchId)
    }
  }, [captain?._id])

  const handleAcceptRide = async () => {
    const token = localStorage.getItem('captainToken')
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setRide(res.data.ride)
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    } catch (_) {}
  }

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
          onAccept={handleAcceptRide}
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