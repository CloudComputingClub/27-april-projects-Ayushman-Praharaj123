import userModel from "../models/userModels.js";
import { createUser } from "../services/userServices.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashpassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashpassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      message: "User created successfully",
      token,
      user
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    res.status(500).json({
      message: error.message
    });

  }
};