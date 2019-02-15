var express = require('express');
var router = express.Router();

var auth = require('./helpers/auth');
var Room = require('../models/room');

// post router
var postsRouter = require('./posts');
router.use('/:roomId/posts', postsRouter);

// post model
var Post = require('../models/post');

// room index page
router.get('/', (req, res, next) => {
	console.log("get rooms index page");
	Room.find({}, 'topic', function(err, rooms) {
		if (err) {
			console.error(err);
		}
		else {
			res.render('rooms/index', {rooms: rooms});
		}
	});
});

// room new action
router.get('/newRoom', auth.requireLogin, (req, res, next) => {
	console.log("go to new room page");
	res.render('rooms/newRoom');
});

// room show action
router.get('/:id', auth.requireLogin, (req, res, next) => {
	console.log("get room /:id --" + req.params.id);
	Room.findById(req.params.id, function(err, room) {
		if (err) {
			console.error(err);
		}
		Post.find({room: room}, function(err, posts) {
			if (err) {
				console.error(err);
			}
			res.render("rooms/showRoom", {room: room, posts: posts});
		});
	});
});

// room edit action
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
	console.log("get room /:id/edit --" + req.params.id);
	Room.findById(req.params.id, function(err, room) {
		if (err) {
			console.error(err);
		}
		res.render('rooms/edit', {room: room});
	});
});

// room update action
router.post('/:id', auth.requireLogin, (req, res, next) => {
	console.log("post room /:id --" + req.params.id);
	Room.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}, function(err, room) {
		if (err) {
			console.error(err);
		}
		res.redirect('/rooms/' + req.params.id);
	});
});

// room create action
router.post('/', auth.requireLogin, (req, res, next) => {
	console.log("post new room");
	var room = new Room(req.body);
	room.save(function(err, room) {
		if (err) {
			console.error(err);
		}
		res.redirect('/rooms/');
	});
});

// room delete action
router.post('/delete', auth.requireLogin, (req, res, next) => {

});

module.exports = router;