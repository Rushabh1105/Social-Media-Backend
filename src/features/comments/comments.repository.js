import { ApplicationError } from "../../error-handler/application.error.js";
import { DataBaseError } from "../../error-handler/db.error.js";
import { UserError } from "../../error-handler/user.error.js";
import PostModel from "../post/post.schema.js";
import UserModel from "../user/user.schema.js";
import CommentModel from "./comment.schema.js";



export default class CommentRepository{
    // Add comment on a post
    async addComment(comment, postId, userId){
        try {
            const post = await PostModel.findById(postId);
            if(!post){
                // If post not found send the response
                throw new UserError('No such post')
            }
            // Create a new comment
            let cmnt = new CommentModel({
                comment: comment,
                commentBy: userId,
                post: postId,
            });
            // Add comment id to the post model
            cmnt = await cmnt.save();
            post.comments.push(cmnt._id);
            await post.save();
            return cmnt;
        } catch (error) {
            
            throw new DataBaseError(error.message);   
        }
    }
    // Get comments on a post
    async getCommentOnPost(postId){
        try {
            const result = await PostModel.findById(postId).populate({path: 'comments'});
            return result;
        } catch (error) {
            console.log(error)
            throw new UserError('No such post');
        }
    }
    // Get comment by id
    async getComment(commentId){
        try {
            const result = await CommentModel.findById(commentId);
            return result;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Update a comment by its id
    async updateComment(commentId, userId, comment){
        try {
            const result = await CommentModel.findById(commentId);
            if(result.commentBy != userId){
                throw new UserError('Not able to update the comment');
            }
            result.comment = comment;
            await result.save();
            return result;

        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Delete a comment
    async deleteComment(commentId, userId){
        try {
            const result = await CommentModel.findById(commentId);
            if(result.commentBy != userId){
                throw new UserError('Not able to delete the comment');
            }
            // Remove comment id from post
            const post = await PostModel.findById(result.post);
            let index = -1;
            post.comments.forEach((cmt, idx) => {
                if(commentId == cmt){
                    index = idx
                }
            });

            if(index == -1){
                throw new ApplicationError('Something went wrong');
            }

            post.comments.splice(index, 1);
            await post.save();
            // Delet comment from commment model
            await CommentModel.findByIdAndDelete(commentId);
            return;
        } catch (error) {
            console.log(error)
            throw new DataBaseError(error.message)
        }
    }
}