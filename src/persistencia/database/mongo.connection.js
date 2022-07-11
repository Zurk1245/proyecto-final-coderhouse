const mongoose = require('mongoose');
const logger = require('../../config/winston-logger');

async function conectarMongo(mongoUrl) {
  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { conectarMongo }