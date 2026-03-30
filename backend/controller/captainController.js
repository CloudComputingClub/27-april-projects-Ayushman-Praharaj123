import captainModel from "../models/captainModel.js";
import { createCaptain } from "../services/captainServices.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistTokenModel.js";

export const registerCaptain = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { fullname, email, password, color, plate, capacity, vehicle } = req.body;
        const hashPassword = await captainModel.hashPassword(password);
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })
        const token = captain.generateAuthToken();
        res.status(201).json({
            message: "captain created sucessfully",
            token,
            captain
        });

    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        res.status(500).json({
            message: err.message
        });
    }
}
export const loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await captainModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


