const mongoose = require('mongoose');
// const dotenv = require('dotenv');
require('dotenv').config()
const app = require('./app');
const logger = require('./config/logger');

let server;

console.log("Inside app ...");
console.log("DB_CONNECTION ", process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  server = app.listen(4001, () => {
    console.log(`Listening to port 4001`);
    logger.info(`Listening to port 4001`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});