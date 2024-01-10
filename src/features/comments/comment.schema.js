import mongoose from "mongoose";

// Defining attributes fro comment Schema

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
});

// Create comment model
const CommentModel = new mongoose.model('Comment', commentSchema);

export default CommentModel;

