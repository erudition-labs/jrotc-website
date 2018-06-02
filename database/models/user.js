const mongoose    = require('mongoose');
const bcrypt            = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstName    : { type: String, required: true },
    lastName     : {type: String, required: true },
    email            : { type: String, required: true },
    rank             : { type: String, required: true },
    password    : { type: String, required: true }
});

const User = module.exports = mongoose.model('User', UserSchema); //name of model and Schema

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = {Email:email}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => { //newUser.password
            if(error) throw error;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (error, isMatch) => {
        if(error) throw error;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function(callback) {
    User.find({}, callback);
}

module.exports.findAndDeleteUserById = function(id, callback) {
    User.findByIdAndRemove(id, callback);
}
