import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { MdLocationOn, MdLocationPin } from "react-icons/md"
import { LuIndianRupee } from "react-icons/lu"
import { FiArrowRight } from "react-icons/fi"

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]
  const navigate = useNavigate()

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...otp]
    updated[index] = value.slice(-1)
    setOtp(updated)
    if (value && index < 3) inputRefs[index + 1].current?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    navigate("/captain-riding", { state: { ride } })
  }

  const fullOtp = otp.join('')

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">Start the Ride</h3>
      <p className="text-sm text-gray-400 mb-5">Ask the rider for their OTP</p>

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
        <div className="flex items-center gap-1 pt-1 border-t border-gray-200">
          <LuIndianRupee size={14} className="text-gray-600" />
          <span className="font-bold text-gray-900">{ride?.fare}</span>
          <span className="text-xs text-gray-400 ml-1">• Cash</span>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <p className="text-sm font-medium text-gray-700 mb-3">Enter 4-digit OTP</p>
        <div className="flex gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="flex-1 h-14 text-center text-2xl font-bold bg-gray-100 border-2 border-transparent rounded-2xl outline-none focus:border-gray-900 focus:bg-white transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={fullOtp.length < 4}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          Start Ride <FiArrowRight size={16} />
        </button>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp