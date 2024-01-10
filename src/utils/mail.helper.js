import nodemailer from 'nodemailer';
import { ApplicationError } from '../error-handler/application.error.js';
import { PASS } from '../config/config.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maverick42@ethereal.email',
        pass: PASS,
    }
});

const send = async (info) => {
    try {
        const response = await transporter.sendMail(info);
        return response;
    } catch (error) {
        throw new ApplicationError(error.message)
    }
}
// Send OTP on email
export const sendOtpEmail = async (email, otp) => {
    const info = {
        from: '"Postway Otp Verification 👻" <maverick42@ethereal.email>',
        to: email,
        subject: "Otp to reset the password",
        text: `Your one time password to reset the account password is ${otp}`
    }

    const response = await send(info);
    return;
}
// Send Passsword update email
export const passwordUpdateEmail = async(email) => {
    const info = {
        from: '"Postway 👻" <maverick42@ethereal.email>',
        to: email,
        subject: "Password reset",
        text: `You have succcessfully reset your password`
    }

    await send(info);
    return;
}
// Send signup alert
export const signUpAlert = async(email) => {
    const info = {
        from: '"Postway 👻" <maverick42@ethereal.email>',
        to: email,
        subject: "SignUp alert",
        text: `Your email is used to create postway account`
    }

    await send(info);
    return;
}
// Send Signin alert
export const signInAlert = async(email) => {
    const info = {
        from: '"Postway 👻" <maverick42@ethereal.email>',
        to: email,
        subject: "SignIn alert",
        text: `Your account was logged in postway at ${new Date()}`
    }

    await send(info);
    return;
}