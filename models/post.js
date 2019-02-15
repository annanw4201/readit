var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	subject: {type: String, required: true},
	body: {type: String, required: true},
	room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;