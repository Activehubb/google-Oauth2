const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

const config = require('./config');

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);

		done(null, user);
	} catch (error) {
		console.log(error.message);
	}
});

passport.use(
	new GoogleStrategy(
		{
			// options for the strategy
			callbackURL: config.google.callbackURL,
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
		},
		async (accessToken, refreshToken, profile, done) => {
			// Passport CB function
			try {
				// find user if user exist in DB
				const user = await User.findOne({ googleID: profile.id });

				if (user) {
					console.log(`User with the ${user.googleID} exist`);
					await done(null, user);
				} else {
					const user = new User({
						username: profile.displayName,
						googleID: profile.id,
						avatar: profile._json.picture,
					});

					await user.save();

					await done(null, user);

					console.log(user);

				}
				console.log(profile);
			} catch (error) {
				console.log(error.message);
			}
		}
	)
);
