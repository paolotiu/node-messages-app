const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    status: { type: String, enum: ['user', 'admin'] },
});

module.exports = mongoose.model('User', UserSchema);
