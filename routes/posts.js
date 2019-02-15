const express = require('express');
const router = express.Router({mergeParams:true});
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');

// new posts
router.get('/newPost', auth.requireLogin, (req, res, next) => {
	Room.findById(req.params.roomId, function(err, room) {
		if (err) {
			console.error(err);
		}
		res.render('posts/newPost', {room: room});
	});
});

// create posts
router.post('/', auth.requireLogin, (req, res, next) => {
	Room.findById(req.params.roomId, function(err, room) {
		if (err) {
			console.error(err);
		}
		var post = new Post(req.body);
		post.room = room;

		post.save(function(err, post) {
			if (err) {
				console.error(err);
			}
			return res.redirect('/rooms/' + room._id);
		});
	});
});

module.exports = router;