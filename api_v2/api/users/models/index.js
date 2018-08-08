const mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;
const uniqueValidator 	= require('mongoose-unique-validator');

const userModel = new Schema({
	firstName	: { type: String, required: true },
	lastName	: { type: String, required: true },
	email		: { type: String, index: true, unique: true, required: true },
	rank		: { type: String, required: true },
	flight 		: { type: String, required: true },
	team 		: { type: String, required: true },
	password	: { type: String, required: true }
}).plugin(uniqueValidator);

