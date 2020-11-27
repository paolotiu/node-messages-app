const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    title: { type: String, required: true, maxlength: 40 },
    timestamp: Date,
    text: String,
    author: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Message', MessageSchema);
