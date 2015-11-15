var express         = require("express");
var app             = express();
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongodb         = require('mongodb');
var https           = require('https');
var yahooFinance    = require('yahoo-finance');
var Wunderground    = require('wundergroundnode');
var moment          = require('moment');
var wgKey           = '72262bdafda1bf6a';
var port            = 8082;

var wunderground = new Wunderground(wgKey);
//MongoClient = mongodb.connect("http://localhost:8000/test").MongoClient;

// mongoose.connect('monogodb://node:viermyr@futurehomedb-53239.onmodulus.net:27017');
mongoose.connect('mongodb://localhost:27017/test');

app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


var Todo = mongoose.model('Todo', {
    text : String
});

var wattagePrHour = mongoose.model('wattagePrHour', {
    wattage: String,
    date: Date
})


var Random = Math.random();
// Dummy temporary
function lol() {

    var startDate = new Date(2014,1,1);
    console.log(startDate);
    var endDate = new Date();
    console.log(endDate);
    var days = (endDate.getTime() - startDate.getTime())/1000/60/60/24;
    console.log(days);

    for (var j = 0; j< Math.floor(days); j++) {
        for (var i = 0; i < 10; i++) {
            var today = new Date();
            console.log(today);
            today.setDate(today.getDate() - j);
            today.setHours(Math.floor(Math.random() * 24));
            wattagePrHour.create({
                date: today,
                wattage: Math.floor(Math.random() * 2 + 1)
            }, function (err, wattagePrHour) {
                if (err)
                    res.send(err);
            });
        }
    }
}

// routes ======================================================================

// api ---------------------------------------------------------------------

app.get('/', function (req, res) {
    res.sendfile('index.html'); // load the single view file (angular will
                                         //  handle the page changes on the front-end)
});

// API call for receiving stock quotes from yahoo finance

// routes ======================================================================

// api ---------------------------------------------------------------------

app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(todos); // return all todos in JSON format
    });
});

// create 2do and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a 2do, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });

});

app.get('/api/todos/lol', function(req , res) {
    lol();
    // use mongoose to get all todos in the database
});


// delete a 2do
app.delete('/api/todos/:todo_id', function(req, res) {
    
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
});


app.get("/api/weather/", function(reg, res){
    getFuturehomeAPI(function(futurehomeJson){
        res.json(futurehomeJson);
    })
});

app.get('/api/wattagePrHour/:startDate', function(req, res) {
    var startDate = new Date(req.params.startDate);
    var endDate = new Date();

    // use mongoose to get all todos in the database
    wattagePrHour.find({
        date:
        {
            $gte: new Date(startDate),
            $lte: new Date(endDate)}
        },
        function(err, wattagePrHour) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(wattagePrHour); // return all todos in JSON format
    });
});
app.get('/api/getDevices/', function(req, res) {
    getFuturehomeAPI(function(data){
        //console.log(data);
        res.json(data);
    });

});

var getFuturehomeAPI = function(callback){

    https.get({
        hostname: 'unstable.futurehome.no',
        port: 443,
        path: '/api/v2/sites/B6088F84-DAB6-420D-B89C-828489DD199A/fragments/xs',
        agent: false,  // create a new agent just for this one request
        headers: {
            'Authorization': 'Bearer mWRuGZZc5U2Q8oHUIixwenL8craSMx14HxIWIkDJ',
            'Accept': 'application/json'
        }
    }, function (result, id) {
        var buffer = "",
            data,
            route;


        result.on("data", function (chunk) {
            buffer += chunk;
        });

        result.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(result.statusCode);
            if(result.statusCode != 200) return;

            data = JSON.parse(buffer);
            callback(data);
        });
    });
}

var interval = setInterval(function() {
    getFuturehomeAPI(function(futurehomeJson){
        wattagePrHour.create({
            date : Date.now(),
            wattage: futurehomeJson.fragment.site.power.wattage
        }, function(err, wattagePrHour) {
            if (err)
                res.send(err);
        });
    })

}, 1000*60);




app.listen(port);
console.log("App listening on port: "+  port);