import CommentRepository from "./comments.repository.js";



export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository()
    }
    // Add comment on a post
    async addCommentOnPost(req, res, next){
        try {
            const userId = req.userData.id;
            const postId = req.params.postId;
            const {content} = req.body;

            const data = await this.commentRepository.addComment(content, postId, userId);

            return res.status(201).send(data);
        } catch (error) {
            next(error)
        }
    }
    // Get all comments on a post
    async getCommentsOnPost(req, res, next){
        try {
            const postId = req.params.postId;
            const data = await this.commentRepository.getCommentOnPost(postId);

            return res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }
    // Update the comment
    async updateComment(req, res, next){
        try {
            const commentId = req.params.commentId;
            const userId = req.userData.id;
            const comment = req.body.content;
            const data = await this.commentRepository.updateComment(commentId, userId, comment);

            return res.status(200).send(data);
        } catch (error) {
            next(error)
        }
    }
    // Delete the comment
    async deleteCommentByUser(req, res, next){
        try {
            const commentId = req.params.commentId;
            const userId = req.userData.id;

            await this.commentRepository.deleteComment(commentId, userId);
            return res.status(200).send('Comment deleted successgully')
        } catch (error) {
            next(error)
        }
    }
}