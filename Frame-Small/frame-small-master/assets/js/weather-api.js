
$(function(){
    //getLocation();
    console.log("before ajax call");
    //setTimeout(function() { weatherFun(); }, 5000);
    weatherFun();
    var futureHomeData;
    function weatherFun(){
        $.ajax({
            url: "http://localhost:8082/api/weather/",
            success: function (parsed_json) {
                futureHomeData = parsed_json;
               

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
                //document.getElementById('wCity').innerHTML = "Oslo";

                // The current temperature @ location
                var temp_f = parsed_json['current_observation']['temp_f'];
                console.log(temp_f);

                // Convert temperature from Fahrenheit to Celsius
                var celsius = (temp_f - 32) * (5 / 9);
                //console.log(celsius);
                celsius = celsius.toFixed(1);   // Only get 1 didget
                // console.log(celsius);
                if(futureHomeData == undefined){
                    document.getElementById('wInsideTemp').innerHTML = "N/A";
                } else{
                document.getElementById('wInsideTemp').innerHTML = futureHomeData.fragment.site.temperature.inside.toFixed(1); 
                }
                document.getElementById('wOutsideTemp').innerHTML = celsius;

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
                    "/assets/img/sunny.png", "/assets/img/cloudy4.png", "/assets/img/cloudy2.png",
                    "/assets/img/cloudy5.png", "/assets/img/shower1.png", "/assets/img/shower3.png", "/assets/img/tstorm3.png",
                    "/assets/img/snow5.png", "/assets/img/cloudy3.png", "/assets/img/fog.png"
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


                for(var i = 0; i < iconStates.length; i++){
                    if(todaysIconText == iconStates[i]){
                        document.getElementById('iconTest').src = theIcons[i];
                        
                    }
                    if(tomorrowsIconText == iconStates[i]){
                        document.getElementById('iconTest1').src = theIcons[i];
                        
                    }
                    if(todayPlus2IconText == iconStates[i]){
                        document.getElementById('iconTest2').src = theIcons[i];
                        
                    }
                    if(todayPlus3IconText == iconStates[i]){
                        document.getElementById('iconTest3').src = theIcons[i];
                        
                    }
                }
            }
        });

    }
});
