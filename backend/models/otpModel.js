import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ride'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
})

const otpModel = mongoose.model('otp', otpSchema)

export default otpModel
