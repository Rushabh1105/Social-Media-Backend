import { DataBaseError } from "../../error-handler/db.error.js";
import { UserError } from "../../error-handler/user.error.js";
import UserModel from "../user/user.schema.js";



export default class FriendRepository{
    // Get friends of a user
    async getFriend(userId){
        try {
            const user = await UserModel.findById(userId).select('-password -tokens -email -requests');
            return user.friends;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Get pending friend requests of a user
    async getPendingRequests(userId){
        try {
            const data = await UserModel.findById(userId)
            .populate({path: 'requests', select: 'id name'});
            return data.requests;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Toggle Friend requets
    async toggleFriendRequest(userId, friendId){
        try {
            // Cant send friend request to self
            if(userId == friendId){
                throw new UserError('Wrong request')
            }
            // Fetch user and freinds data
            const user = await UserModel.findById(userId);
            const data = await UserModel.findById(friendId);
            let index1 = -1;
            let index2 = -1;
            user.friends.forEach((friend, idx) => {
                if(friend == friendId){
                    index1 = idx;
                }
            });
            user.friends.forEach((friend, idx) => {
                if(friend == friendId){
                    index2 = idx;
                }
            });

            // If not freind then send friend request
            if(index1 == -1){
                // Avoid Duplicate friend requests
                data.requests.forEach((req) => {
                    if(req == userId){
                        throw new UserError('Already request sent')
                    }
                })
                data.requests.push(userId);
                await data.save();
                return null;
            }else{ // if friend then unfriend them
                user.friends.splice(index1,1);
                data.friends.splice(index2,1);
                await user.save();
                await data.save();
                return user;
            }

            
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Accept the freind request by another user
    async acceptFriendRequest(userId, friendId){
        try {
            const user = await UserModel.findById(userId);
            let index = -1;
            user.requests.forEach((req, idx) => {
                if(req == friendId){
                    index = idx;
                }
            });

            if(index == -1){
                throw new UserError('No such pending request found');
            }
            // Remove enry from request array
            user.requests.splice(index, 1);
            const friend = await UserModel.findById(friendId);
            friend.friends.push(userId);
            user.friends.push(friendId);
            await user.save();
            await friend.save();
            return;
        } catch (error) {
            throw new DataBaseError(error.message);
        }
    }
    // Reject friend request
    async rejectFriendRequest(userId, friendId){
        try {
            const user = await UserModel.findById(userId);
            let index = -1;
            user.requests.forEach((req, idx) => {
                if(req == friendId){
                    index = idx;
                }
            });
            user.requests.splice(index, 1);
            await user.save();
            return;
        } catch (error) {
            throw new DataBaseError(error.message);
        }
    }
}