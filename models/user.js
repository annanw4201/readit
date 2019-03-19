const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, minlength: 5, maxlength: 20},
	password: {type: String, required: true, minlength: 5, maxlength: 255},
	email: {type: String, required: true, unique: true}
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

userSchema.statics.validate = function(user, next) {
	const validateSchema = {
		username: Joi.string().min(5).max(50).required(),
		password: Joi.string().min(5).max(255).required(),
		password_confirmation: Joi.string().required().valid(Joi.ref('password')).options({
			language: {
				any: {
					allowOnly: 'Password do not match!'
				}
			}
		}),
		email: Joi.string().email().required()
	};
	const error = Joi.validate(user, validateSchema).error;
	if (error) {
		return next(error.details[0]);
	}
	User.findOne({$or: [{email: user.email}, {username: user.username}]}, function(err, user) {
		if (err) {
			return next(err);
		}
		else if (user) {
			const error = new Error('User already exists with the email or the username!');
			error.status = 400;
			next(error, user);
		}
		else {
			next(null, null);
		}
	});
}

userSchema.statics.authenticate = function(username, password, next) {
	User.findOne({username: username}, function(err, user) {
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