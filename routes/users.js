var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, 'username', function(err, users) {
  	if (err) {
  		console.error(err);
  	}
  	else {
  		res.render('users/', {users: users});
  	}
  });
});

// redirect to new user creation page
router.get('/newUser', function(req, res, next) {
	res.render('users/newUser');
});

// write username into database
router.post('/newUser', function(req, res, next) {
	const user = new User(req.body);
	user.save(function(err, user) {
		if (err) {
			console.error('New user not working');
		}
		return res.redirect('/users');
	});
});

module.exports = router;
