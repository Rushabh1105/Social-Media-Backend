import express from 'express';

import LikeController from './like.controller.js';
const likeController = new LikeController();
const likeRoutes = express.Router();
// Route to toggle likes on post or comment
likeRoutes.get('/toggle/:id', (req, res, next) => {
    likeController.toggleLikeOnPost(req, res, next);
});
// Route to fetch likes on post or comment
likeRoutes.get('/:id', (req, res, next) => {
    likeController.getLikes(req, res, next);
});

export default likeRoutes;