import express from 'express';
import FriendController from './friend.controller.js';


const friendRoutes = express.Router();
const friendController = new FriendController();
// Route to get friend details
friendRoutes.get('/get-friends/:userId', (req, res, next) => {
    friendController.getUserById(req, res, next)
})
// Route to get pending request for user
friendRoutes.get('/get-pending-requests', (req, res,next) => {
    friendController.getPendingRequests(req, res, next);
});
// Route to toggle friendhip
friendRoutes.get('/toggle-friendship/:friendId', (req, res, next) => {
    friendController.toggleFriendRequests(req, res, next);
});
// Route to respond friendrequest
friendRoutes.get('/response-to-request/:friendId', (req, res, next) => {
    friendController.acceptRejectFriendRequest(req, res, next)
})
export default friendRoutes;
