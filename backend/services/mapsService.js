export const getAddressSuggestions = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=in`

    const res = await fetch(url, {
        headers: { 'User-Agent': 'Drivigo/1.0 contact@drivigo.com' }
    })

    if (!res.ok) throw new Error('Failed to fetch suggestions')

    return res.json()
}

export const getCoordinates = async (address) => {
    const results = await getAddressSuggestions(address)
    if (!results.length) throw new Error('Location not found')

    return {
        lat: parseFloat(results[0].lat),
        lng: parseFloat(results[0].lon)
    }
}

export const getDistanceAndDuration = async (origin, destination) => {
    const apiKey = process.env.ORS_API_KEY

    if (!apiKey) {
        return { distance: 5000, duration: 900 }
    }

    const url = 'https://api.openrouteservice.org/v2/directions/driving-car'

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            coordinates: [
                [origin.lng, origin.lat],
                [destination.lng, destination.lat]
            ]
        })
    })

    if (!res.ok) return { distance: 5000, duration: 900 }

    const data = await res.json()
    const route = data.routes[0]

    return {
        distance: route.summary.distance,
        duration: route.summary.duration
    }
}

export const calculateFare = (vehicleType, distanceMeters) => {
    const km = distanceMeters / 1000

    const rates = {
        car: { base: 50, perKm: 12 },
        motorcycle: { base: 20, perKm: 6 },
        auto: { base: 30, perKm: 9 }
    }

    const rate = rates[vehicleType] || rates.car
    return Math.round(rate.base + km * rate.perKm)
}
