const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const actions = require("./actions");
const path = require("path");

var corsOptions = {
  origin: 'localhost',
}
const app = express();




app.use(function(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.json());
  
app.use(cors(corsOptions));

app.use(express.static(path.resolve(__dirname, '../client/build')));




app.get('/', function(req, res){
    res.json({
        error: "Not a valid path. Please read documentation for more details"
    });
});

app.get('/api/score', function(req, res){ 
    actions.getScore(req.query, function(err, data){
        if (err === null) res.json({
            status: 'SUCCESS',
            scores: data
        });
        else res.json({status: err});
    })
});



app.post('/api/score', function(req, res){
    actions.submitScore(req.body, function(err, data){
        if (err === null) res.json({status: 'SUCCESS'});
        else res.json({status: err});
    });
});

app.post('/api/clearscore', function(req, res){
    actions.clearScore(req.body, function(err, data){
        if (err === null) res.json({status: 'SUCCESS'});
        else res.json({status: err});
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const actualPort = process.env.PORT || 3001;

app.listen(actualPort, function() { 
    console.log(`Server now listening on port ${actualPort}`);
});