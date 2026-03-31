import userModel from "../models/userModels.js";
import captainModel from "../models/captainModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistTokenModel.js";
export const authUser = async (req, res, next) => {

    const token = req.cookies?.token || req.headers.authorization?.split("")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    };
    const isBlacklisted = await blacklistTokenModel.findOne({token: token });

    if (isBlacklisted) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id)
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized" })
    }

}

export const authCaptain = async (req, res, next) => {
     const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}