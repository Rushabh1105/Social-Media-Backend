import mongoose from "mongoose";

// Defining various attributes of post
const postSchema = new mongoose.Schema({
    postImage: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
});
// Crete a post model
const PostModel = new mongoose.model('Post', postSchema);
export default PostModel;