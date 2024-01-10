
import { UserError } from "../../error-handler/user.error.js";
import { UserProfileRepository } from "./userProfile.repository.js";


export class UserProfileController{
    constructor(){
        this.userProfileRepository = new UserProfileRepository();
    }
    // Get information of user
    async getUser(req, res, next){
        try {
            const id = req.params.userId
            const user = await this.userProfileRepository.getUser(id);
            return res.status(200).send(user);
        } catch (error) {
            next(error)
        }
    }
    // Get list of all users
    async getAllUsers(req, res, next){
        try {
            const data = await this.userProfileRepository.getAllDetails();
            return res.status(200).send(data);
        } catch (error) {
            next(error)
        }
    }
    // Update the details of user
    async updateUser(req, res, next){
        try {
            const id = req.params.userId;
            if(id != req.userData.id){
                return res.status(401).send('You can update only your information')
            }

            const userData = req.body;
            await this.userProfileRepository.updateUserDetails(id, userData);

            return res.status(201).send('profile updated successfully'); 
        } catch (error) {
            next(error) 
        }
    }
    // Upload the avatar for profile
    async updateProfile(req, res, next){
        try {
            const imageUrl = req.file.filename;
            // console.log(imageUrl)
            await this.userProfileRepository.updateProfile(req.userData.id, imageUrl);

            return res.status(201).send('Profile updated successfully')
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}