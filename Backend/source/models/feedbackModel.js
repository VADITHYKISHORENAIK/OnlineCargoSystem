'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note: Considered leadsquared predefined names so dint followed proper naming conventions
const feedbackModel = new Schema({
 Name: String,
 Email: String,
 Message: String,
});

module.exports = mongoose.dataBase.model('feedback_messages',feedbackModel);

