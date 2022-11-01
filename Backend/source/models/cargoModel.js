'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note: Considered leadsquared predefined names so dint followed proper naming conventions
const cargoModel = new Schema({
 Name: String,
 Email: String,
 Phone: String,
 From: String,
 To: String,
 Date: String,
});

module.exports = mongoose.dataBase.model('cargobookings',cargoModel);

