var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	body: {type: String, required: true}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;