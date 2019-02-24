var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	subject: {type: String, required: true},
	body: {type: String, required: true},
	room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}],
	points: {type: Number, default: 0}
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;