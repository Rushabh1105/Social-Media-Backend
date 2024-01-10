// Handle Errors by user

export class UserError extends Error{
    constructor(message){
        super(message);
    }
}