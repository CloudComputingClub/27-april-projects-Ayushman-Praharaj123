import nodemailer from 'nodemailer'
import otpModel from '../models/otpModel.js'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString()
}

export const sendOtpEmail = async (email, otp, rideId) => {
    const mailOptions = {
        from: `"Drivigo" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your Drivigo Ride OTP',
        html: `
            <div style="font-family: sans-serif; max-width: 420px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
                <img src="cid:logo" style="width: 120px; margin-bottom: 20px;" />
                <h2 style="color: #111827; margin-bottom: 8px;">Your Ride OTP</h2>
                <p style="color: #6b7280; margin-bottom: 24px;">Share this code with your captain to start your ride.</p>
                <div style="background: #f9fafb; border-radius: 8px; padding: 20px; text-align: center; letter-spacing: 12px; font-size: 36px; font-weight: bold; color: #111827;">
                    ${otp}
                </div>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">This OTP expires in 5 minutes. Do not share it with anyone other than your captain.</p>
            </div>
        `
    }

    await transporter.sendMail(mailOptions)
    await otpModel.create({ email, otp, rideId })
}

export const verifyOtp = async (rideId, otp) => {
    const record = await otpModel.findOne({ rideId, otp })
    if (!record) return false
    await otpModel.deleteOne({ _id: record._id })
    return true
}
