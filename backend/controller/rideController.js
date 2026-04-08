import rideModel from '../models/rideModel.js'
import { getCoordinates, getDistanceAndDuration, calculateFare } from '../services/mapsService.js'
import { generateOtp, sendOtpEmail } from '../services/otpService.js'
import { validationResult } from 'express-validator'

export const createRide = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { pickup, destination, vehicleType } = req.body

    try {
        const [pickupCoords, destCoords] = await Promise.all([
            getCoordinates(pickup),
            getCoordinates(destination)
        ])

        let routeData = { distance: 5000, duration: 900 }
        try {
            routeData = await getDistanceAndDuration(pickupCoords, destCoords)
        } catch (_) {}

        const fare = calculateFare(vehicleType, routeData.distance)
        const otp = generateOtp()

        const ride = await rideModel.create({
            user: req.user._id,
            pickup,
            destination,
            fare,
            distance: routeData.distance,
            duration: routeData.duration,
            otp
        })

        res.status(201).json({ ride })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const confirmRide = async (req, res) => {
    const { rideId } = req.body

    try {
        const ride = await rideModel.findById(rideId).populate('user').select('+otp')
        if (!ride) return res.status(404).json({ message: 'Ride not found' })

        ride.captain = req.captain._id
        ride.status = 'accepted'
        await ride.save()

        try {
            await sendOtpEmail(ride.user.email, ride.otp, ride._id)
        } catch (_) {}

        const rideData = ride.toObject()
        delete rideData.otp

        res.status(200).json({ ride: rideData })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const startRide = async (req, res) => {
    const { rideId, otp } = req.body

    try {
        const ride = await rideModel.findById(rideId).select('+otp')
        if (!ride) return res.status(404).json({ message: 'Ride not found' })
        if (ride.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' })

        ride.status = 'ongoing'
        ride.otp = undefined
        await ride.save()

        res.status(200).json({ ride })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const endRide = async (req, res) => {
    const { rideId } = req.body

    try {
        const ride = await rideModel.findById(rideId)
        if (!ride) return res.status(404).json({ message: 'Ride not found' })

        ride.status = 'completed'
        await ride.save()

        res.status(200).json({ ride })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
