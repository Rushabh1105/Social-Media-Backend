import mongoose from "mongoose";
import UserModel from './user.schema.js'
import { DataBaseError } from "../../error-handler/db.error.js";
import { UserError } from "../../error-handler/user.error.js";
import { ApplicationError } from "../../error-handler/application.error.js";

export class UserRepository{
    // Function to sign up an user
    async signup(user){
        try {
            // Create a new user to database
            const newUser = new UserModel(user);
            
            return await newUser.save();
        } catch (error) {
            throw new DataBaseError(error.message);
        }
    }
    // Function to veryfy if user is present or not
    async singin(email, password) {
        try {
            const user = await UserModel.findOne({ email: email});
            if(!user){
                throw new UserError('email is incorrect')
            }
            // Check for the password
            const compare = await user.isValidPassword(password)
            if(!compare){
                throw new UserError('Incorrect password');
            }
            // return user object
            return {
                id: user._id,
                name: user.name,
                email: user.email,
            };
        } catch (error) {
            throw new DataBaseError(error.message);
        }
    }
    // Function to save login token in database in user object
    async saveTokenToDb(token, userId){
        try {
            const user = await UserModel.findById(userId);
            user.tokens.push({token});
            await user.save();
            return;
        } catch (error) {
            throw new ApplicationError(error.message);
        }
    }
    // Function to delete a specific token from database
    // for logout functionality
    async deleteToken(userData, token){
        try {
            const user = await UserModel.findById(userData.id);
            let index = -1;
            
            user.tokens.forEach((t, idx) => {
                if(t.token == token){
                    index = idx;
                }
            });
            // If token was not found
            if(index == -1) {
                throw new ApplicationError('Something went wrong')
            }

            user.tokens.splice(index, 1);
            user.save();
            return;
        } catch (error) {
            // console.log(error)
            throw new UserError('Invalid token');
        }
    }
    // Function for deleting all tokens in database if
    // user wants to logout from all devices
    async deleteAllTokens(userData){
        try {
            const user = await UserModel.findById(userData.id);

            user.tokens = [];
            user.save();
            return;
        } catch (error) {
            throw new ApplicationError('Something wrong with database');
        }
    }

}

