// import { response } from "express";
import LikeRepository from "./like.repository.js";



export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository()
    }
    // Function to like on post or comment
    async toggleLikeOnPost(req, res, next){
        try {
            const userId = req.userData.id;
            const id = req.params.id;
            const type = req.query.type;
            let response;

            if(type == 'Post'){
                response = await this.likeRepository.toggleLikeOnPost(userId, id)
            }else if(type == 'Comment'){
                response = await this.likeRepository.toggleLikeOnComment(userId, id);
            }

            if(response == null ){
                return res.status(200).send('like removed')
            }else{
                return res.status(200).send(response);
            }
            
        } catch (error) {
            next(error);
        }
    }
    // Function to get likes on post or comment
    async getLikes(req, res, next){
        try {
            const id = req.params.id;
            const data = await this.likeRepository.getAllLikes(id);
            return res.status(200).send(data)
        } catch (error) {
            next(error)
        }
    }
}