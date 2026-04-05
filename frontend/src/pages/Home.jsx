import React, { useState } from "react"
import { motion } from "framer-motion"

const Home = () => {

  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="h-screen w-screen relative overflow-hidden">

      {/* Background Image */}
      <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/o1bNNmgE34Llv5ABeEebZBLoi0z_YSrVQF4zseyr1l8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/NjYyNjQwMi92ZWN0/b3IvaWxsdXN0cmF0/aW9uLW9mLWhhbmQt/aG9sZGluZy1zbWFy/dC1waG9uZS13aXRo/LW5hdmlnYXRpb24t/YXBwLW9uLXNjcmVl/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9X194VFBwbG5j/VGZSQzRreFNRUjlt/dmkxZ0VlbTgzVmN4/RUhVZFMyd2ZuST0"
          alt=""
        />

      {/* Logo (always on top) */}
      <img
        className="w-36 absolute top-5 left-5 z-50"
        src="/finalLogo.png"
        alt="Drivigo"
      />

      {/* Animated Bottom Panel */}
      <motion.div
        animate={{
          height: panelOpen ? "80%" : "35%"
        }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl shadow-xl z-30"
      >

        <h4 className="text-2xl font-semibold mb-6">
          Find a trip
        </h4>

        <form className="flex flex-col gap-4">

          <input
            onFocus={() => setPanelOpen(true)}
            className="bg-gray-100 px-4 py-3 rounded-lg outline-none"
            type="text"
            placeholder="Add a pick-up location"
          />

          <input
            onFocus={() => setPanelOpen(true)}
            className="bg-gray-100 px-4 py-3 rounded-lg outline-none"
            type="text"
            placeholder="Add your destination"
          />

        </form>

        {panelOpen && (
          <button
            onClick={() => setPanelOpen(false)}
            className="mt-6 bg-black text-white py-3 px-5 rounded-lg"
          >
            Close
          </button>
        )}

      </motion.div>

    </div>
  )
}

export default Home