import mongoose from "mongoose";

// Defining various attributes for like
const likeSchma = new mongoose.Schema({
    likeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model',
    },
    // Like can be on post or a comment
    on_model: {
        type: String,
        enum: ['Post', 'Comment']
    }
});
// Create a like model
const LikeModel = new mongoose.model('Like', likeSchma);
export default LikeModel;