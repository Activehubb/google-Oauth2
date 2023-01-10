exports.auth = function (req, res, next) {
	if (!req.user) {
		res.redirect('/');
	} else {
		next();
	}
};
