import { UserError } from "../../error-handler/user.error.js";
import { UserRepository } from "./user.repository.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_KEY } from "../../config/config.js";
import { signInAlert, signUpAlert } from "../../utils/mail.helper.js";

export class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    // Signup function
    async signup(req, res, next){
        const {name, email, password, gender} = req.body;
        try {
            // Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userRepository.signup({name, email, password: hashedPassword, gender});
            // Send signUp alert
            signUpAlert(email)
            return res.status(201).send('User created successfully')
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    // Function to signup a user and send a JWT token
    async signin(req, res, next) {
        try {
            const {email, password} = req.body;
            const result = await this.userRepository.singin(email, password);
            if(!result){
                next(new UserError('Incorrect credentials'));
            }
            //  Sending token on successful verification
            const token = await jwt.sign(result, JWT_KEY, {
                expiresIn: '5d',
            });
            await this.userRepository.saveTokenToDb(token, result.id);
            // Send signIn alert
            signInAlert(email)
            return res.status(201).send(token);

        } catch (error) {
            next(error);
        }
    }

    // Function to logout from current device
    async logout(req, res, next){
        try {
            const userData = req.userData;
            const token = req.headers['authorization'];
            // console.log(typeof token)
            await this.userRepository.deleteToken(userData, String(token));

            return res.status(200).send('logout successful');
        } catch (error) {
            next(error);
        }
    }

    // Function to logout from all devices
    async logoutAllDevices(req, res, next){
        try {
            const userData = req.userData;
            await this.userRepository.deleteAllTokens(userData);

            return res.status(200).send('logged out from all devices')
        } catch (error) {
            next(error);
        }
    }
}