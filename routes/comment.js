var express = require('express');
var router = express.Router({mergeParams:true});
var auth = require('./helpers/auth');
var Post = require('../models/post');
var Room = require('../models/room');
var Comment = require('../models/comment');

// new comments
router.get('/newComment', auth.requireLogin, (req, res, next) => {
	Room.findById(req.params.roomId, function(err, room) {
		if (err) {
			console.error(err);
		}
		Post.findById(req.params.postId, function(err, post){
			if (err) {
				console.error(err);
			}
			res.render('comments/newComment', {room: room, post: post});
		});
	});
});

// create comment
router.post('/', auth.requireLogin, (req, res, next) => {
	Room.findById(req.params.roomId, function(err, room) {
		if (err) {
			console.error(err);
		}
		Post.findById(req.params.postId, function(err, post) {
			if (err) {
				console.error(err);
			}
			var comment = new Comment(req.body);
			post.comments.unshift(comment);
			post.save(function(err, post){
				if (err) {
					console.error(err);
				}
				comment.save(function(err, comment) {
					if (err) {
						console.error(err);
					}
					return res.redirect(`/rooms/${room.id}`);
				});
			});
		});
	});
});

module.exports = router;