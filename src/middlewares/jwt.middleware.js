import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config/config.js';
import UserModel from '../features/user/user.schema.js';

// Check JWT tocken for secure requests
const jwtAuth = async( req, res, next ) => {
    const token = req.headers['authorization'];
    // Check if token is valid or not
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    try {
        const payload = jwt.verify(token, JWT_KEY);
        const user = await UserModel.findById(payload.id);
        let dbToken = false;
        // Check if the same token is present in Database or not
        user.tokens.forEach((t) => {
            if(t.token == token){
                dbToken = true;
            }
        })

        // If token is not present in database then also user will be unauthorized
        if(!dbToken){
            return res.status(401).send('Unauthorized');
        }
        // Adding userData to request object
        req.userData= payload;
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }

    next();
}

export default jwtAuth;