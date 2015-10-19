var express         = require("express"),
    app             = express();
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongodb         = require('mongodb');
var https           = require('https');
var yahooFinance    = require('yahoo-finance');
var port            = 8081;

//MongoClient = mongodb.connect("http://localhost:8000/test").MongoClient;

// mongoose.connect('monogodb://node:viermyr@futurehomedb-53239.onmodulus.net:27017');
mongoose.connect('mongodb://localhost:27017/test');

app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});
// routes ======================================================================

// api ---------------------------------------------------------------------

app.get('/', function (req, res) {
    res.sendfile('public/index.html'); // load the single view file (angular will
                                         //  handle the page changes on the front-end)
});

// API call for receiving stock quotes from yahoo finance
/*
var stockQutes = function(ticker){
    yahooFinance.snapshot({
            symbol: ticker,
            fields: ['s', 'n', 'd2', 'l1', 'y', 'r']
        }, function(err, snapshot){
            console.log(snapshot);
        }
    );

};
stockQutes('AAPL');
stockQutes('MSFT');
*/


// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
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

app.get("/api/stocks/", function(req,res){
    yahooFinance.snapshot({
            symbols: ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TWTR', 'TSLA', 'EBAY', 'BIDU'],
            fields: ['s', 'n', 'd2', 'l1', 'o', 'p2']
        }, function(err, snapshot){
            //console.log(snapshot);
            res.json(snapshot);
        }
    );

});
/*
app.get("/api/weather/", function(reg, res){
    https.get({
        hostname: 'unstable.futurehome.no',
        port: 443,
        path: '/api/v2/sites/B6088F84-DAB6-420D-B89C-828489DD199A/fragments/xs',
        agent: false,  // create a new agent just for this one request
        headers: {
            'Authorization': 'Bearer mWRuGZZc5U2Q8oHUIixwenL8craSMx14HxIWIkDJ',
            'Accept': 'application/json'
        }
    }, function (result) {
        var buffer = "",
            data,
            route;

        result.on("data", function (chunk) {
            buffer += chunk;
        });

        result.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            data = JSON.parse(buffer);
            res.json(data);


        });
    });
});
*/
app.listen(port);
console.log("App listening on port: "+  port);