import express from 'express';
import OtpController from './otp.controller.js';


const otpRoutes = express.Router();
const otpController = new OtpController();

// Route to get the otp
otpRoutes.post('/send', (req, res, next) => {
    otpController.getOtp(req, res, next);
});
// Route to verify otp
otpRoutes.post('/verify', (req, res, next) => {
    otpController.verifyOtp(req, res, next)
});
// Route to update password
otpRoutes.post('/reset-password', (req, res, next) => {
    otpController.resetPassword(req, res, next)
})
export default otpRoutes;