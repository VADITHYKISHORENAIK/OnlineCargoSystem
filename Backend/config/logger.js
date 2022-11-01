const pino = require("pino");

const logger = pino({});

logger.stream = {
    write: (message) => {
        console.log(message);
    }
};

module.exports = logger;