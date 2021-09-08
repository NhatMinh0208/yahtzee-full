const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    name: String,
    time: Date, 
    score: Number
});

const Score = mongoose.model('Score', scoreSchema);

exports.Score = Score;