var express = require('express');
var router = express.Router();

var auth = require('./helpers/auth');
var Room = require('../models/room');

// post router
var postRouter = require('./post');
router.use('/:roomId/posts', postRouter);

// post model
var Post = require('../models/post');

// room index page
router.get('/', (req, res, next) => {
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
	res.render('rooms/newRoom');
});

// room show action
router.get('/:id', auth.requireLogin, (req, res, next) => {
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
	Room.findById(req.params.id, function(err, room) {
		if (err) {
			console.error(err);
		}
		res.render('rooms/edit', {room: room});
	});
});

// room update action
router.post('/:id', auth.requireLogin, (req, res, next) => {
	Room.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}, function(err, room) {
		if (err) {
			console.error(err);
		}
		res.redirect('/rooms/' + req.params.id);
	});
});

// room create action
router.post('/', auth.requireLogin, (req, res, next) => {
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