import mongoose, { mongo } from "mongoose";


const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['verified', 'not-verified']
    }
});

const OtpModel = new mongoose.model('OTP', otpSchema);
export default OtpModel;