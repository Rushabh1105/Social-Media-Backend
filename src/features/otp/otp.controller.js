import { passwordUpdateEmail } from "../../utils/mail.helper.js";
import OtpRepository from "./otp.repository.js";



export default class OtpController{
    constructor(){
        this.otpRepository = new OtpRepository()
    }

    async getOtp(req, res, next){
        try {
            const {email} = req.body
            const otp = await this.otpRepository.getOtp(email);

            return res.status(201).send(`Your one time password is sent to your email`);
        } catch (error) {
            next(error)
        }
    }

    async verifyOtp(req, res, next){
        try {
            const {email, otp } = req.body;
            await this.otpRepository.verifyOtp(email, otp);

            return res.status(201).send('Otp verified successfully');
        } catch (error) {
            next(error)
        }
    }

    async resetPassword(req, res, next){
        try {
            const {email, password} = req.body;
            await this.otpRepository.updatePassword(email, password);
            passwordUpdateEmail(email);
            return res.status(201).send('Your password has been reset successfully');
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}