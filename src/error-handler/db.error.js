// Handle Database level error

export class DataBaseError extends Error{
    constructor(message){
        super(message);
    }
}