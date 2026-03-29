import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Name must be more than 3 chars"]
        },
        lastname: {
            type: String,
            minlength: [3, "Name must be more than 3 chars"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [3, "Must be more than 3"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be more than 6 chars"]
    },
    socketId: {
        type: String
    },

})
userSchema.methods.generateAuthToken = function () {

    const Token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return Token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);


export default userModel;
