const models = require('./models');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

function submitScore(data, callback) {
    if (data.time === undefined) {
        data.time = new Date();
    }
    if (data.score === undefined) {
        callback('ERROR: Score not found');
        return;
    }
    if (data.name === undefined) {
        callback('ERROR: Name not found');
        return;
    }
    const newScore = new models.Score({
        name: data.name, 
        time: data.time,
        score: data.score
    });
    const timeOut = setTimeout(function () {
        callback('ERROR: Request timed out');
    }, 10000);

    newScore.save().then(() => {
        clearTimeout(timeOut);
        callback(null);
    });
}


function getScore(data, callback) {
    const timeOut = setTimeout(function () {
        callback('ERROR: Request timed out');
    }, 10000);

    models.Score.find({
    }).then((res) => {
        clearTimeout(timeOut);
        callback(null, res);
    });
}

function clearScore(data, callback) {
    const timeOut = setTimeout(function () {
        callback('ERROR: Request timed out');
    }, 10000);

    models.Score.deleteMany({
    }).then(() => {
        clearTimeout(timeOut);
        callback(null);
    });
}

exports.submitScore = submitScore;
exports.getScore = getScore;
exports.clearScore = clearScore;