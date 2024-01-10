import express from 'express';
import { UserController } from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


const userRoutes = express.Router();
const userController = new UserController()
// Signup route
userRoutes.post('/signup', (req, res, next) => {
    userController.signup(req, res, next);
});
// signin route
userRoutes.post('/signin', (req, res, next) => {
    userController.signin(req, res, next);
});
// login from current device route
userRoutes.get('/logout', jwtAuth, (req, res, next) => {
    userController.logout(req, res, next);
});
// logout from all devices route
userRoutes.get('/logout-all-devices', jwtAuth, (req, res, next) => {
    userController.logoutAllDevices(req, res, next);
})


export default userRoutes;
