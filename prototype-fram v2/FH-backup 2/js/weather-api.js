/*
getLocation = function() {

    /// call your function here
    geocoder = new google.maps.Geocoder();

    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
    }

    function errorFunction() {
        alert("Geocoder failed");
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                console.log(results[8].formatted_address);
                theCountry = results[8].formatted_address;

                console.log(results[6].address_components[0].long_name);
                theCity = results[6].address_components[0].long_name;


            }
        });
    }
};
*/
$(function(){
    //getLocation();
    console.log("before ajax call");
    setTimeout(function() { weatherFun(); }, 5000);

    var futureHomeData;
    function weatherFun(){
        $.ajax({
            url: "http://localhost:8082/api/weather/",
            success: function (parsed_json) {
                futureHomeData = parsed_json;
                $('#mainWeather').load('/public/weather.html');


                console.log(parsed_json.fragment.site.temperature.inside.toFixed(1));
                //console.log(parsed_json.fragment.site.temperature.inside);




            },
            error: function(err){
                console.log(err);
            }
        });
        $.ajax({
            url: "http://api.wunderground.com/api/72262bdafda1bf6a/geolookup/conditions/forecast/q/Norway/Oslo.json",
            dataType: "jsonp",
            success: function (parsed_json) {
                console.log("Inside Ajax");

                // TODAYS WEATHER ********************************
                // Location of the person
                document.getElementById('wCity').innerHTML = "Oslo";

                // The current temperature @ location
                var temp_f = parsed_json['current_observation']['temp_f'];
                console.log(temp_f);

                // Convert temperature from Fahrenheit to Celsius
                var celsius = (temp_f - 32) * (5 / 9);
                //console.log(celsius);
                celsius = celsius.toFixed(1);   // Only get 1 didget
                // console.log(celsius);
                document.getElementById('wInsideTemp').innerHTML = futureHomeData.fragment.site.temperature.inside.toFixed(1);
                document.getElementById('wOutsideTemp').innerHTML = futureHomeData.fragment.site.temperature.outside.toFixed(1);

                // TOMORROWS WEATHER
                // The day of the week (short)
                var forecastDayPlus1 = {};
                var jsonPath = parsed_json["forecast"]["simpleforecast"]["forecastday"];

                forecastDayPlus1.shortTxt = jsonPath[1]["date"]["weekday_short"];
                // console.log(forecastDayPlus1.shortTxt);
                document.getElementById('day1-txt').innerHTML = forecastDayPlus1.shortTxt;

                // Degrees
                forecastDayPlus1.maxTemp = jsonPath[1]["high"]["celsius"];
                forecastDayPlus1.minTemp = jsonPath[1]["low"]["celsius"];
                forecastDayPlus1.avgTemp = (parseInt(forecastDayPlus1.maxTemp) + parseInt(forecastDayPlus1.minTemp)) / 2;
                // console.log(forecastDayPlus1.minTemp + " " + forecastDayPlus1.maxTemp + " " + forecastDayPlus1.avgTemp);
                document.getElementById('day1-degrees').innerHTML = forecastDayPlus1.avgTemp;

                // Decide icon!


                // THE DAY AFTER TOMORROW
                // The day of the week (short)
                var forecastDayPlus2 = {};

                forecastDayPlus2.shortTxt = jsonPath[2]["date"]["weekday_short"];
                //console.log(forecastDayPlus2.shortTxt);
                document.getElementById('day2-txt').innerHTML = forecastDayPlus2.shortTxt;

                // Degrees
                forecastDayPlus2.maxTemp = jsonPath[2]["high"]["celsius"];
                forecastDayPlus2.minTemp = jsonPath[2]["low"]["celsius"];
                forecastDayPlus2.avgTemp = (parseInt(forecastDayPlus2.maxTemp) + parseInt(forecastDayPlus2.minTemp)) / 2;
                //console.log(forecastDayPlus2.minTemp + " " + forecastDayPlus2.maxTemp + " " + forecastDayPlus2.avgTemp);
                document.getElementById('day2-degrees').innerHTML = forecastDayPlus2.avgTemp;

                // Decide icon!

                // THREE DAYS INTO THE FUTURE
                // The day of the week (short)
                var forecastDayPlus3 = {};

                forecastDayPlus3.shortTxt = jsonPath[3]["date"]["weekday_short"];
                //console.log(forecastDayPlus3.shortTxt);
                document.getElementById('day3-txt').innerHTML = forecastDayPlus3.shortTxt;

                // Degrees
                forecastDayPlus3.maxTemp = jsonPath[3]["high"]["celsius"];
                forecastDayPlus3.minTemp = jsonPath[3]["low"]["celsius"];
                forecastDayPlus3.avgTemp = (parseInt(forecastDayPlus3.maxTemp) + parseInt(forecastDayPlus3.minTemp)) / 2;
                //console.log(forecastDayPlus3.minTemp + " " + forecastDayPlus3.maxTemp + " " + forecastDayPlus3.avgTemp);
                document.getElementById('day3-degrees').innerHTML = forecastDayPlus3.avgTemp;

                // Decide icon!

                // ICON TESTING
                var theIcons = [
                    "/images/sunny.png", "/images/cloudy4.png", "/images/cloudy2.png",
                    "/images/cloudy5.png", "/images/shower1.png", "/images/shower3.png", "/images/tstorm3.png",
                    "/images/snow5.png", "/images/cloudy3.png", "/images/fog.png"
                ];

                var iconStates = ["clear", "mostlycloudy", "partlycloudy", "cloudy", "chancerain", "rain",
                    "tstorm", "snow", "mostlysunny", "fog"];


                //console.log(theIcons);

                var todaysIconText = jsonPath[0]["icon"];
                var tomorrowsIconText = jsonPath[1]["icon"];
                var todayPlus2IconText = jsonPath[2]["icon"];
                var todayPlus3IconText = jsonPath[3]["icon"];


                // Array containg the states (not used)
                var iconText = [];
                iconText.push(todaysIconText);
                iconText.push(tomorrowsIconText);
                iconText.push(todayPlus2IconText);
                iconText.push(todayPlus3IconText);

                //console.log(iconText);

                for(var i = 0; i < iconStates.length; i++){
                    if(todaysIconText == iconStates[i]){
                        document.getElementById('iconTest').src = theIcons[i];
                        //         console.log(theIcons[i]);
                    }
                    if(tomorrowsIconText == iconStates[i]){
                        document.getElementById('iconTest1').src = theIcons[i];
                        //         console.log(theIcons[i]);
                    }
                    if(todayPlus2IconText == iconStates[i]){
                        document.getElementById('iconTest2').src = theIcons[i];
                        //        console.log(theIcons[i]);
                    }
                    if(todayPlus3IconText == iconStates[i]){
                        document.getElementById('iconTest3').src = theIcons[i];
                        //       console.log(theIcons[i]);
                    }
                }
            }
        });

    }
});
