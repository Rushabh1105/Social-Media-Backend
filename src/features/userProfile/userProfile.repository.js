import mongoose from "mongoose";
import UserModel from '../user/user.schema.js'
import { DataBaseError } from "../../error-handler/db.error.js";
import { UserError } from "../../error-handler/user.error.js";
import { ApplicationError } from "../../error-handler/application.error.js";

export class UserProfileRepository{
    // Get a specific user details by id
    async getUser(userID){
        try {
            const user = await UserModel.findById(userID).select('-password -tokens -_id -__v');
            return user;
        } catch (error) {
            throw new UserError(error.message)
        }
    }
    // Get details of all users 
    async getAllDetails(){
        try {
            const users = await UserModel.find().select('-password -tokens -_id -__v');
            return users;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Update the data logged in user
    async updateUserDetails(userId, userData){
        try {
            
            if(userData.password){
                throw new UserError('You cannot update password');
            }
            await UserModel.findByIdAndUpdate(userId, userData);
            return;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Upload avatar for the user
    async updateProfile(userId, imageUrl){
        try {
            const user = await UserModel.findById(userId);
            user.profileImage = imageUrl;
            await user.save();
            return;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }

}

