import { useState, useEffect } from "react"
import { MdLocationOn, MdHistory, MdMyLocation } from "react-icons/md"
import { FiLoader } from "react-icons/fi"

const LocationSearchPanel = ({ activeField, setPickup, setDestination, closePanel, query }) => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&countrycodes=in`,
          { headers: { 'User-Agent': 'Drivigo/1.0' } }
        )
        const data = await res.json()
        setSuggestions(data)
      } catch (_) {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (displayName) => {
    if (activeField === "pickup") {
      setPickup(displayName)
    } else {
      setDestination(displayName)
    }
    closePanel()
  }

  const recentPlaces = [
    "Connaught Place, New Delhi",
    "Cyber Hub, Gurgaon",
    "Indira Gandhi International Airport"
  ]

  return (
    <div className="mt-4 flex flex-col gap-1 max-h-72 overflow-y-auto">
      {loading && (
        <div className="flex items-center gap-3 px-1 py-3 text-gray-400">
          <FiLoader className="animate-spin" size={18} />
          <span className="text-sm">Searching...</span>
        </div>
      )}

      {!loading && suggestions.length > 0 && suggestions.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelect(item.display_name)}
          className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="mt-0.5 bg-gray-100 rounded-full p-1.5 shrink-0">
            <MdLocationOn size={16} className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 line-clamp-1">
              {item.display_name.split(',')[0]}
            </p>
            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {item.display_name.split(',').slice(1, 3).join(',')}
            </p>
          </div>
        </div>
      ))}

      {!loading && suggestions.length === 0 && (
        <>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider px-1 mb-1">Recent</p>
          {recentPlaces.map((place, index) => (
            <div
              key={index}
              onClick={() => handleSelect(place)}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="bg-gray-100 rounded-full p-1.5 shrink-0">
                <MdHistory size={16} className="text-gray-500" />
              </div>
              <p className="text-sm text-gray-700">{place}</p>
            </div>
          ))}
          <div
            onClick={() => handleSelect("Current Location")}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <div className="bg-blue-100 rounded-full p-1.5 shrink-0">
              <MdMyLocation size={16} className="text-blue-500" />
            </div>
            <p className="text-sm text-blue-600 font-medium">Use current location</p>
          </div>
        </>
      )}
    </div>
  )
}

export default LocationSearchPanel