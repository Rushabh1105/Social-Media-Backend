import express from 'express';
import { UserProfileController } from './userProfile.controller.js';
import profileUpload from '../../middlewares/avatar.upload.js';


const userProfileRoutes = express.Router();
const userProfileController = new UserProfileController()

// Route tp get users details
userProfileRoutes.get('/get-details/:userId', (req, res, next) => {
    userProfileController.getUser(req, res, next)
});
// Route to get all users
userProfileRoutes.get('/get-all-details', (req, res, next) => {
    userProfileController.getAllUsers(req, res, next)
});
// Route to update the avatar of user
userProfileRoutes.put('/update-details/:userId/avatar', profileUpload.single('profileUrl'), (req, res, next) => {
    userProfileController.updateProfile(req, res, next)
})
// Route to update the user details
userProfileRoutes.put('/update-details/:userId', (req, res, next) => {
    userProfileController.updateUser(req, res, next)
});

export default userProfileRoutes;
