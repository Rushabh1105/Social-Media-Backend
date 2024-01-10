import FriendRepository from "./friend.repository.js";



export default class FriendController{
    constructor(){
        this.friendRepository = new FriendRepository()
    }
    // Get user details
    async getUserById(req, res, next){
        try {
            const userId = req.params.userId;
            const result = await this.friendRepository.getFriend(userId);
            return res.status(200).send(result);
        } catch (error) {
            next(error)
        }
    }

    // Get pending requests
    async getPendingRequests(req, res, next){
        try {
            const userId = req.userData.id;
            const response = await this.friendRepository.getPendingRequests(userId);

            return res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
    // Toggle Friends status
    async toggleFriendRequests(req, res, next){
        try {
            const userId = req.userData.id;
            const friendId = req.params.friendId;

            const response = await this.friendRepository.toggleFriendRequest(userId, friendId);

            if(response == null ){
                return res.status(200).send('Friend request sent');
            }else{
                return res.status(200).send('Unfreind from your friend list')
            }
        } catch (error) {
            next(error)
        }
    }
    // Accept or reject the friend request
    async acceptRejectFriendRequest(req, res, next){
        try {
            const userId = req.userData.id;
            const friendId = req.params.friendId;
            const status = req.query.status;
            if(status == 'reject'){
                await this.friendRepository.rejectFriendRequest(userId, friendId);

                return res.status(200).send('friend request deleted successfully');
            }else{
                await this.friendRepository.acceptFriendRequest(userId, friendId);

                return res.status(200).send('accepted friend request')
            }

        } catch (error) {
            next(error)
        }
    }
}