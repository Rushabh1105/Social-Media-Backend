// Handle Application level error

export class ApplicationError extends Error{
    constructor(message){
        super(message);
    }
}