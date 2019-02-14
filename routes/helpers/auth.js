exports.requireLogin = (req, res, next) => {
	if (req.session && req.session.userId) {
		return next();
	}
	else {
		var error = new Error('You must log in to view this page');
		error.status = 404;
		return res.redirect('/login');
	}
}