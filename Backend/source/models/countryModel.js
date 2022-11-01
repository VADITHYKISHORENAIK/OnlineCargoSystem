'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note: Considered leadsquared predefined names so dint followed proper naming conventions
const countryModel = new Schema({
 country: String,
});

module.exports = mongoose.dataBase.model('countries',countryModel );

