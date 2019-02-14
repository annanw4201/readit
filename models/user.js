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

userSchema.statics.authenticate = function(username, password, next) {
	User.findOne({username: username}, function(err, user) {
		console.log(user);
		if (err) {
			return next(err);
		}
		else if (!user) {
			var error = new Error('User not found');
			error.status = 401;
			return next(error);
		}
		bcrypt.compare(password, user.password, function(err, result) {
			if (result == true) {
				return next(null, user);
			}
			else {
				return next();
			}
		})
	});
};

const User = mongoose.model('User', userSchema);
module.exports = User;