
import express from 'express';

const defaultRouter = express.Router();

// Default router to handle entry requests
defaultRouter.get('/', (req, res) => {
    res.status(200).send('Welcome to the Postway');
});


// Route to handle resources which are not present
defaultRouter.use((req, res) => {
    res.status(404).send('Resource not found');
})

export default defaultRouter;
