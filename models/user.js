const mongoose = require('mongoose');
const { use } = require('passport');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	googleID: String,
	avatar: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
