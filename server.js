// Importing Required Dependencies
import express from 'express';
import bodyParser from 'body-parser';

// Importing required packages
import { PORT } from './src/config/config.js';
import { connectToMongoDB } from './src/dbConfig/mongoose.config.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import defaultRouter from './default.routes.js';
import userRoutes from './src/features/user/user.routes.js';
import { ApplicationError } from './src/error-handler/application.error.js';
import { UserError } from './src/error-handler/user.error.js';
import { DataBaseError } from './src/error-handler/db.error.js';
import userProfileRoutes from './src/features/userProfile/userProfile.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import postRoutes from './src/features/post/post.routes.js';
import commentRoutes from './src/features/comments/comment.routes.js';
import likeRoutes from './src/features/likes/like.routes.js';
import friendRoutes from './src/features/friendship/friend.routes.js';
import otpRoutes from './src/features/otp/otp.routes.js';

// Create an express app to setup the server
const app = express();

// various routes userd by server
app.use(bodyParser.json()); //To parse request body
app.use(bodyParser.urlencoded({extended: true}) ); // To parse URL encoded data
app.use(loggerMiddleware); // Logger Middleware to log the data in logs.txt file
app.use('/api/users', userRoutes); //User Routes for login and signup and logout
app.use('/api/users', jwtAuth, userProfileRoutes); // User routes for updating the users data
app.use('/api/posts', jwtAuth, postRoutes); // Routes to perform CRUD on post
app.use('/api/comments', jwtAuth, commentRoutes); // Routes to perform CRUD on comments on a post
app.use('/api/likes', jwtAuth, likeRoutes); // Routes to like a Post or Comment
app.use('/api/friends', jwtAuth, friendRoutes); // Routes for managing friendship
app.use('/api/otp', otpRoutes); // Routes for otp
app.use(defaultRouter);  // Default routes

//  Route to handle error in server
app.use((err, req, res, next) => {
    if(err instanceof ApplicationError){
        return res.status(500).send(err.message);
    }else if(err instanceof UserError){
        return res.status(404).send(err.message);
    }else if(err instanceof DataBaseError){
        return res.status(502).send(err.message);
    }else{
        return res.status(500).send('Something went wrong');
    }
})

// Configuring the port for server to run
app.listen(PORT, async () => {
    await connectToMongoDB()
    console.log(`Serving on port ${PORT}`);
})

