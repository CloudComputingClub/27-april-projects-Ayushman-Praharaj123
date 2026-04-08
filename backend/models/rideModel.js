import mongoose from 'mongoose'

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'requested'
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'upi'],
        default: 'cash'
    },
    otp: {
        type: String,
        select: false
    }
}, { timestamps: true })

const rideModel = mongoose.model('ride', rideSchema)

export default rideModel
