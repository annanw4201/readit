const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
});

// before we save the user data, call this function and hash the user's password
userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			console.error(err);
		}
		user.password = hash;
		next();
	});
});

const User = mongoose.model('User', userSchema);
module.exports = User;