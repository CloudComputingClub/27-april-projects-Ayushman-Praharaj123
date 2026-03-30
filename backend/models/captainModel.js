import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 50
    },
    socketId: {
        type: String,

    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'busy'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
}
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const captainModel = mongoose.model('captain', captainSchema);
export default captainModel;