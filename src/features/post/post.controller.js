import PostRepository from "./post.repository.js";



export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }
    // Create a post by user
    async createPost(req, res, next){
        try {
            const userId = req.userData.id;
            const {caption} = req.body;
            const imageUrl = req.file.filename;

            const post = await this.postRepository.addPost(userId, imageUrl, caption);

            return res.status(201).send(post);
        } catch (error) {
            // console.log(error)
            next(error);
        }
    }
    // Get all posts uploaded by user
    async getAllPostsByUser(req, res, next){
        try {
            const userId = req.userData.id;
            const result = await this.postRepository.getAllPostByUser(userId);
            return res.status(200).send(result);
        } catch (error) {
            // console.log(error)
            next(error);
        }
    }
    // Get all posts from all users
    async getAll(req, res, next){
        try {
            const data = await this.postRepository.getAllPosts();
            // console.log(data)
            return res.status(200).send(data);            
        } catch (error) {
            next(error)
        }
    }
    // Retrive a specific post by its id
    async getPostById(req, res, next){
        try {
            const postId = req.params.postId;
            const data = await this.postRepository.getPost(postId);

            return res.status(200).send(data);
        } catch (error) {
            next(error)
        }
    }
    // Delete a specificpost by its id
    async deletePostByUser(req, res, next){
        try {
            const userId = req.userData.id;
            const postId = req.params.postId;
            await this.postRepository.deletePost(userId, postId);
            return res.status(200).send('Post deleted successfully');

        } catch (error) {
            next(error)
        }
    }
    // Updata a post by its id
    async updatePostByUser(req, res, next){
        try {
            const userId = req.userData.id;
            const {caption} = req.body;
            const postId = req.params.postId;
            const imageUrl = req.file.filename;

            await this.postRepository.updatePost(userId, postId, caption, imageUrl);

            return res.status(203).send('Post updated successfully')
        } catch (error) {
            next(error)
        }
    }
}

