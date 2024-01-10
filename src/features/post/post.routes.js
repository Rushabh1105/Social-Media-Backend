import express from 'express';
import PostController from './post.controller.js';
import postImageUpload from '../../middlewares/postImage.upload.js';

const postRoutes = express.Router();

const postController = new PostController();
// Route to get all posts
postRoutes.get('/all', (req, res, next) => {
    postController.getAll(req, res, next);
});
// Route to get post by its id
postRoutes.get('/:postId', (req, res, next) => {
    postController.getPostById(req, res, next);
});
// Route to create a post
postRoutes.post('/', postImageUpload.single('imageUrl'), (req, res, next) => {
    postController.createPost(req, res, next);
});
// Route to get all post by user
postRoutes.get('/', (req, res, next) => {
    postController.getAllPostsByUser(req, res, next);
});
// Route to delete a post
postRoutes.delete('/:postId', (req, res, next) => {
    postController.deletePostByUser(req, res, next)
});
// Route to update a post
postRoutes.put('/:postId', postImageUpload.single('imageUrl'), (req, res, next) => {
    postController.updatePostByUser(req, res, next);
});

export default postRoutes;
