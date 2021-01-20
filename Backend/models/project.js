'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	nombre: String,
	origen: String,
	ano: Number,
	director: String,
	reparto: String,
	image: String
});
module.exports = mongoose.model('Project', ProjectSchema);