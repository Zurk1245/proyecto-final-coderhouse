const winston = require("winston");
const logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console({ level: "silly" }),
        new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
        new winston.transports.File({ filename: "./logs/error.log", level: "error" })
    ]
});

module.exports = logger;