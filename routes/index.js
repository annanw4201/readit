var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.use(function(req, res, next) {
	res.locals.title = 'readit';
	res.locals.currentUserId = req.session.userId;
	res.locals.currentUsername = req.session.username;
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

// redirect to login page
router.get('/login', (req, res, next) => {
	res.render('login');
});

// authenticating username and its matched password
router.post('/login', (req, res, next) => {
	console.log(req.body)
	User.authenticate(req.body.username, req.body.password, (err, user) => {
		if (err || !user) {
			var error = new Error('Username or password incorrect!');
			error.status = 401;
			return next(err) ;
		}
		else {
			req.session.userId = user._id;
			req.session.username = user.username;
			return res.redirect('/');
		}
	});
});

// log out the user account
router.get('/logout', (req, res, next) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err){
				return next(err);
			}
			res.locals.currentUserId = null;
			return res.redirect('/login');
		});
	}
});

module.exports = router;
