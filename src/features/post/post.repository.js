
import { UserError } from "../../error-handler/user.error.js";
import { ApplicationError } from "../../error-handler/application.error.js";
import { DataBaseError } from "../../error-handler/db.error.js";
import UserModel from "../user/user.schema.js";
import PostModel from "./post.schema.js";

export default class PostRepository{
    // Creating a post by user
    async addPost(userId, imageUrl, caption){
        try {
            const post = new PostModel({
                postImage: imageUrl,
                caption: caption,
                postBy: userId,
            });
            const data = await post.save();
            await UserModel.findByIdAndUpdate(userId, {
                $push: {
                    posts: data._id,
                }
            });
            return post;
        } catch (error) {
            throw new UserError(error.message);
        }
    }
    // Get posts uploaded by user
    async getAllPostByUser(userId) {
        try {
            const data = await UserModel.findById(userId).populate({path: 'posts'}).select('-password -tokens');
            return data;
        } catch (error) {
            console.log(error);
            throw new UserError(error.message);
        }
    }
    // Get all posts by all users
    async getAllPosts(){
        try{
            const data = await PostModel.find({});
            // console.log(data)
            return data;
        }catch(error) {
            throw new ApplicationError('unable to fetch at this time')
        }
    }
    // Get a single post by its id
    async getPost(postId){
        try {
            const data = await PostModel.findById(postId);
            return data;
        } catch (error) {
            throw new DataBaseError(error.message)
        }
    }
    // Delete a post by user
    async deletePost(userId, postId){
        try {
            const post = await PostModel.findById(postId);
            // If it is not users post thenhe cant delete it
            if(post.postBy == userId){
                await PostModel.findByIdAndDelete(postId);
                return;
            }else{
                throw new UserError('You can delete only your post')
            }
            
        } catch (error) {
            throw new ApplicationError(error.message)
        }
    }
    // Update the post
    async updatePost(userId, postId, caption, imageUrl){
        try {
            const post = await PostModel.findById(postId);
            // If its not users post then he cant update it
            if(post.postBy != userId){
                throw new UserError('You can update only your post');
            }

            if(caption){
                post.caption = caption
            }
            if(imageUrl){
                post.postImage = imageUrl;
            }
            await post.save();
            return;
        } catch (error) {
            console.log(error)
            throw new ApplicationError(error.message)
        }
    }
}

