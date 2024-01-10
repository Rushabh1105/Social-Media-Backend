import { DataBaseError } from "../../error-handler/db.error.js";
import { UserError } from "../../error-handler/user.error.js";
import CommentModel from "../comments/comment.schema.js";
import PostModel from "../post/post.schema.js";
import LikeModel from "./like.schema.js";



export default class LikeRepository{
    // Like or dislike a post
    async toggleLikeOnPost(userId, postId){
        try {
            const like = await LikeModel.find({likeBy: userId, likeable: postId, on_model: 'Post'});
            const post = await PostModel.findById(postId);
            // If no post found then send the error
            if(post == null){
                throw new UserError('No such post found')
            }
            // If post is not liked then like the post
            if(like.length == 0){
                let newLike = new LikeModel({
                    likeBy: userId,
                    likeable: postId,
                    on_model: 'Post'
                });
                newLike = await newLike.save();
                post.likes.push(newLike._id);
                await post.save();
                return newLike;
            }else{
                // If post is already liked then dislike the post
                await LikeModel.findByIdAndDelete(like[0]._id);
                let index = -1;
                post.likes.forEach((lk, idx) => {
                    if(lk == like._id){
                        index = idx;
                    }
                });
                post.likes.splice(index, 1);
                await post.save();
                return null;
            }

        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Like or dislike on comment
    async toggleLikeOnComment(userId, commentId){
        try {
            // If comment is not liked then add like to it
            const like = await LikeModel.find({likeBy: userId, likeable: commentId, on_model: 'Comment'});
            const comment = await CommentModel.findById(commentId);

            if(comment == null ){
                throw new UserError('No Such comment')
            }
            if(like.length == 0){
                let newLike = new LikeModel({
                    likeBy: userId,
                    likeable: commentId,
                    on_model: 'Comment'
                });
                newLike = await newLike.save();
                comment.likes.push(newLike._id);
                await comment.save();
                return newLike;
            }else{
                // If comment is already liked then dislike it
                await LikeModel.findByIdAndDelete(like[0]._id);
                let index = -1;
                comment.likes.forEach((lk, idx) => {
                    if(lk == like._id){
                        index = idx;
                    }
                });
                comment.likes.splice(index, 1);
                await comment.save();
                return null;
            }

        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Get all likes on post ot comment
    async getAllLikes(id){
        try {
            const like = await LikeModel.findById(id);
            // To get likes on post
            if(like.on_model == 'Post'){
                const data = await PostModel.findById(like.likeable)
                .populate({path: 'likes', select: 'likeBy'})
                .populate({path: 'postBy', select: '-password -tokens -posts'})
                .select('-comments ');
                return data;
            }else{
                // To get likes on comment
                const data = await CommentModel.findById(like.likeable)
                .populate({path: 'likes'})
                .populate({path: 'commentBy', select: '-password -tokens -posts'});
                return data;
            }
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
}