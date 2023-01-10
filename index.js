const express = require('express');
const authRoute = require('./routes/auth');
const passportSetup = require('./config/passport-setup');
const dbConnect = require('./config/dbConfig');
const cookieSession = require('cookie-session');
const config = require('./config/config');
const passport = require('passport');
const profileRoute = require('./routes/profile');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [config.session.key],
	})
);

app.use(passport.initialize());
app.use(passport.session());
dbConnect();
// Home route

app.get('/', (req, res) => {
	res.render('home.ejs');
});

app.use('/auth', authRoute);
app.use('/profile', profileRoute);

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
