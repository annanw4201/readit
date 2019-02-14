var express = require('express');
var router = express.Router();

var auth = require('./helpers/auth');
var Room = require('../models/room');

// room index page
router.get('/', (req, res, next) => {
	Room.find({}, 'topic', function(err, rooms) {
		if (err) {
			console.error(err);
		}
		else {
			res.render('rooms/', {rooms: rooms});
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

});

// room edit action
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {

});

// room update action
router.post('/:id', auth.requireLogin, (req, res, next) => {

});

// room create action
router.post('/', (req, res, next) => {
	var room = new Room(req.body);
	room.save(function(err, room) {
		if (err) {
			console.error(err);
		}
		return res.redirect('/rooms');
	});
});

// room delete action
router.post('/delete', auth.requireLogin, (req, res, next) => {

});

module.exports = router;