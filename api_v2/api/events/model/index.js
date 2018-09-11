const mongoose 	= require('mongoose');
const Schema	= mongoose.Schema;

const eventModel = new Schema({
	name					: { type: String, required: true  },
	isVerificationRequired	: { type: Boolean, required: true, default: true },
	isVerified				: { type: Boolean, required: true, default: false },
	isSignupRequired		: { type: Boolean, required: true, default: false },
	date					: [{ type: Date, required: false }],
	OIC		: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: false
	}],
	signedUp : [{
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: false
	}],
	additionalDetails : { type: String, required: false }
});

module.exports = mongoose.model('event', eventModel);
