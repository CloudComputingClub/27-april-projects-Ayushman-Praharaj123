import express from 'express'
import { body } from 'express-validator'
import { createRide, confirmRide, startRide, endRide } from '../controller/rideController.js'
import { authUser, authCaptain } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', authUser, [
    body('pickup').notEmpty().withMessage('Pickup location is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], createRide)

router.post('/confirm', authCaptain, [
    body('rideId').notEmpty().withMessage('Ride ID is required')
], confirmRide)

router.post('/start', authCaptain, [
    body('rideId').notEmpty().withMessage('Ride ID is required'),
    body('otp').isLength({ min: 4, max: 4 }).withMessage('OTP must be 4 digits')
], startRide)

router.post('/end', authCaptain, [
    body('rideId').notEmpty().withMessage('Ride ID is required')
], endRide)

export default router
