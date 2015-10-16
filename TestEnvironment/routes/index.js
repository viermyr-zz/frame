var express = require('express');
var router = express.Router();
var http = require("http");
var https = require("https");

/* GET home page. */
router.get('/', function(req, res, next) {

  var url = "http://api.trafikanten.no/reisrest/Travel/GetTravelsByPlaces/?time=131020151829&toplace=(x=600000,y=6642000)&fromplace=2190400&changeMargin=2&changePunish=10&walkingFactor=100&walkingDistance=2000&isAfter=True&proposals=12&transporttypes=Bus,AirportTrain,Boat,Train,Tram,Metro"

  var options = {
    host: 'https://www.unstable.futurehome.no',
    path: '/api/v2/sites/B6088F84-DAB6-420D-B89C-828489DD199A/fragments/xs',
    port: 80,
    headers: {
      'Authorization': 'Bearer mWRuGZZc5U2Q8oHUIixwenL8craSMx14HxIWIkDJ',
      'Accept': 'application/json'
    },
    method: 'GET'
  }

// get is a simple wrapper for request()
// which sets the http method to GET


  https.get({
    hostname: 'unstable.futurehome.no',
    port: 443,
    path: '/api/v2/sites/B6088F84-DAB6-420D-B89C-828489DD199A/fragments/xs',
    agent: false,  // create a new agent just for this one request
    headers: {
      'Authorization': 'Bearer mWRuGZZc5U2Q8oHUIixwenL8craSMx14HxIWIkDJ',
      'Accept': 'application/json'
    }
  }, function (res) {
    var buffer = "",
        data,
        route;

    res.on("data", function (chunk) {
      buffer += chunk;
    });

    res.on("end", function (err) {
      // finished transferring data
      // dump the raw data
      data = JSON.parse(buffer);

    });
  });


  /*
   var checkStuff = http.get(options, function(response) {

   res.on('end', function () {
   console.log('No more data in response.')
   })
   /*var buffer = "",
   data,
   route;

   response.on("data", function (chunk) {
   buffer += chunk;
   });

   response.on("end", function (err) {
   // finished transferring data
   // dump the raw data
   data = JSON.parse(buffer);

   console.log(data);
   });

   });

   checkStuff({'accept': 'Content/json'});*/

   var request = http.get(url, function (response, callback) {
   // data is streamed in chunks from the server
   // so we have to handle the "data" event
   var buffer = "",
   data,
   route;

   response.on("data", function (chunk) {
   buffer += chunk;
   });

   response.on("end", function (err) {
   // finished transferring data
   // dump the raw data
   data = JSON.parse(buffer);

     var jsonDate = data.GetTravelsByPlacesResult.TravelProposals[0].DepartureTime;
   var date = new Date(parseInt(jsonDate.substr(6)));

   var timeSpan = getDiffTime(date.getTime(), Date.now());

   var timeText = "";
   for (var property in timeSpan) {

   if (timeSpan.hasOwnProperty(property)) {
   if (timeSpan[property] == 0 || timeSpan[property] == undefined) continue;
   timeText += timeSpan[property] + " " + property + " ";
   }
   }

   res.render('index', {TravelText: timeText, news: ""});

   function getDiffTime(date1, date2) {
   var diff = date1 - date2;
   var timeSpan = {};

   timeSpan.days = Math.floor(diff / (1000 * 60 * 60 * 24));
   diff -= timeSpan.days * (1000 * 60 * 60 * 24);

   timeSpan.hours = Math.floor(diff / (1000 * 60 * 60));
   diff -= timeSpan.hours * (1000 * 60 * 60);

   timeSpan.mins = Math.floor(diff / (1000 * 60));
   diff -= timeSpan.mins * (1000 * 60);

   timeSpan.seconds = Math.floor(diff / (1000));
   diff -= timeSpan.seconds * (1000);


   return timeSpan;
   }
   });
  });
//});
});


module.exports = router;
