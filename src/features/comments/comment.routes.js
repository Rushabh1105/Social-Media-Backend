import express from 'express';
import CommentController from './comment.controller.js';


const commentRoutes = express.Router();

const commentController = new CommentController();
// Route to add comment on post
commentRoutes.post('/:postId', (req, res, next) => {
    commentController.addCommentOnPost(req, res, next);
});
// Route to get all comments on a post
commentRoutes.get('/:postId', (req, res, next) => {
    commentController.getCommentsOnPost(req, res, next);
});
// Route to fetch the comment by its id
commentRoutes.put('/:commentId', (req, res, next) => {
    commentController.updateComment(req, res, next);
});
// Route to delete the comment
commentRoutes.delete('/:commentId', (req, res, next) => {
    commentController.deleteCommentByUser(req, res, next)
})

export default commentRoutes;
