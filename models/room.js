var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	topic: {type: String, required: true}
});

module.exports = mongoose.model('Room', RoomSchema);