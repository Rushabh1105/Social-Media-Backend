import { ApplicationError } from "../../error-handler/application.error.js";
import { UserError } from "../../error-handler/user.error.js";
import { sendOtpEmail } from "../../utils/mail.helper.js";
import UserModel from "../user/user.schema.js";
import OtpModel from "./otp.schema.js";
import bcrypt from 'bcrypt';


export default class OtpRepository{
    // Get otp for user using email
    async getOtp(email){
        try {
            // Check for the user
            const user = await UserModel.find({email: email});
            if(!user){
                throw new UserError('No such user');
            }
            // Check for already present otp
            const otpData = await OtpModel.find({email: email});
            if(otpData.length > 0){
                throw new UserError('Already otp sent');
            }

            const otp = this.generateOtp();
            const newOtp = new OtpModel({
                userId: user[0]._id,
                email: email,
                otp: otp,
                status: 'not-verified'
            });
            await newOtp.save();
            sendOtpEmail(email, otp);
            return otp;
        } catch (error) {
            throw new ApplicationError(error.message);
        }
    }
    // Function to generate otp
    generateOtp(){
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    }
    // Function to verify otp
    async verifyOtp(email, otp){
        try {
            const data = await OtpModel.find({email: email, otp: otp});
            if(data.length == 0){
                throw new UserError('Wrong OTP')
            }else{
                data[0].status = 'verified',
                await data[0].save();
            }
        } catch (error) {
            throw new ApplicationError(error.message);
        }
    }

    async updatePassword(email, password){
        try {
            const otp = await OtpModel.findOne({email: email});
            if(otp.status == 'verified'){
                const user = await UserModel.findById(otp.userId);
                if(!user){
                    throw new UserError('User not found');
                }

                user.password = await bcrypt.hash(password, 10);
                await user.save();
                await OtpModel.findByIdAndDelete(otp._id);
                return;
            }else{
                throw new UserError('Verify otp first');
            }
        } catch (error) {
            
            throw new ApplicationError(error.message)
        }
    }
}