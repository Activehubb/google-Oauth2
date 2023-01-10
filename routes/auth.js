const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/login', (req, res) => {
	res.render('login');
});

// Auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// CB for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
})

router.get('/logout', (req, res) => {
	// Handle with passport
	res.send('logout');
});

module.exports = router;
