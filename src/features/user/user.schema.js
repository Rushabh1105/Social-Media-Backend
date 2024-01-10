import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Schema for various attributes for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\../, 'Not a valid email']
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    tokens: [
        {
            token: String,
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    profileImage: String
})

// Method to check the encrypted password
userSchema.methods.isValidPassword = async function checkValidity(password){
    const user = this;
    // console.log(this.password);
    const compare = await bcrypt.compare(password, user.password);
    // console.log(compare);
    return compare;
}

// Create user model
const UserModel = mongoose.model('User', userSchema);
export default UserModel;

