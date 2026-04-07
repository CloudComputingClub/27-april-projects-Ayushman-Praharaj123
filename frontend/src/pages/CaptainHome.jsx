import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import CaptainDetails from "../Components/CaptainDetails"
import RidePopUp from "../Components/RidePopUp"
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const dummyRide = {
    _id: "123",
    pickup: "MG Road Metro Station",
    destination: "Cyber Hub Gurgaon",
    fare: 250,
    otp: "4567",
    user: {
      fullname: {
        firstname: "Rahul"
      }
    }
  }

  const [ride, setRide] = useState(dummyRide)

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, { transform: "translateY(0)" })
    } else {
      gsap.to(ridePopupPanelRef.current, { transform: "translateY(100%)" })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, { transform: "translateY(0)" })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, { transform: "translateY(100%)" })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className="h-screen">

      {/* HEADER */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />

        <Link
          to="/"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* MAP */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      {/* CAPTAIN DETAILS */}
      <div className="h-2/5 p-6">
        <CaptainDetails />

        <button
          onClick={() => setRidePopupPanel(true)}
          className="mt-5 bg-black text-white w-full py-3 rounded-lg"
        >
          Simulate Ride Request
        </button>

      </div>

      {/* RIDE POPUP */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      {/* CONFIRM RIDE */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
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