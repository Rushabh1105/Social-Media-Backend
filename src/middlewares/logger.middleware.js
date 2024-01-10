import winston from "winston";

// Configure logger middleware
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'logs.txt'})
    ]
})

// Apply logger middleware to incoming request to log them in
//  a separate file
const loggerMiddleware = async (req, res, next) => {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    logger.info(logData);
    next();
}

export default loggerMiddleware;