function getYearData(callback) {
    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/",
        success: function (jsonData) {

            var currentYearData = [];
            var previousYearData = [];

            var date = new Date();
            var startDate = new Date();
            startDate.setMonth(1);

            fillData(currentYearData, date, function(data){
                date.setFullYear(date.getFullYear() - 1);

                fillData(previousYearData, date, function(previousData){
                    callback(data, previousData);
                })
            });

            function fillData(data, date, callback){

                for (var j = 1; j <= 12; j++) {
                    data.push(0);
                }

                var previous = -1;
                var count = 1;
                var sum = 0;
                var today = date;

                for (var i = 0; i < jsonData.length; i++) {

                    if( new Date(jsonData[i].date).getYear() != today.getYear()) continue;

                    if (jsonData[i].wattage == null) continue;

                    var index = new Date(jsonData[i].date).getMonth();

                    if (index === -1) continue;

                    if (index != previous) {
                        //console.log("Count:" + count + " Sum:" + sum + "index: " + index)
                        data[previous] = ((sum / count) / 1000) * 3600 ;
                        previous = index;
                        sum = 0;
                        count = 1;
                    } else {
                        count++;
                    }
                    sum += parseInt(jsonData[i].wattage);
                }
                data[previous] = ( ((sum / count) / 1000)* 3600);
                console.log("This is THE data your looking for: " + previous);
                callback(data);
            }
        }
    });
}
function getMonthData(callback) {
    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/",
        success: function (jsonData) {

            var currentDayData = [];
            var previousDayData = [];

            var date = new Date();
            var startDate = new Date();
            startDate.setDate(1);

            fillData(currentDayData, startDate, date, function(data){
                date.setMonth(date.getMonth() - 1);
                var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                var previousMonthFirst = new Date(date.getYear(),date.getMonth(), 1);
                var previousMonthLast = new Date(date.getYear(),date.getMonth(), lastDayOfMonth.getDate());

                fillData(previousDayData, previousMonthFirst, previousMonthLast, function(previousData){
                    callback(data, previousData);
                })
            });

            function fillData(data,startDate, date, callback){

                var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                for (var j = 0; j < lastDayOfMonth.getDate(); j++) {
                    data.push(0);
                }

                var previous = -1;
                var count = 1;
                var sum = 0;
                var today = date;

                for (var i = 0; i < jsonData.length; i++) {

                    var inScope = false;
                    for(var j = startDate.getDate(); j <= today.getDate(); j++ ) {
                        if( new Date(jsonData[i].date).getMonth() != startDate.getMonth()) break;

                        if (new Date(jsonData[i].date).getDate() == j) {
                            inScope = true;
                        }
                    }
                    if(!inScope) continue;

                    if (jsonData[i].wattage == null) continue;

                    var index = new Date(jsonData[i].date).getDate() -1
                    if (index === -1) continue;

                    if (index != previous) {
                        //console.log("Count:" + count + " Sum:" + sum + "index: " + index)
                        data[previous] = ((sum / count) / 1000) * 3600 ;
                        previous = index;
                        sum = 0;
                        count = 1;
                    } else {
                        count++;
                    }
                    sum += parseInt(jsonData[i].wattage);
                }
                data[previous] = ( ((sum / count) / 1000)* 3600);
                console.log("This is THE data your looking for: " + previous);
                callback(data);
            }
        }
    });
}
function getDayData(callback) {
    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/",
        success: function (jsonData) {

            var currentDayData = [];
            var previousDayData = [];
            var date = new Date();
            fillData(currentDayData, date, function(data){
                date.setDate(date.getDate() - 1);
                fillData(previousDayData, date, function(previousData){
                    callback(data, previousData);
                })
            });

            function fillData(data, date, callback){

                for (var j = 0; j < 24; j++) {
                    data.push(0);
                }

                var previous = -1;
                var count = 1;
                var sum = 0;
                var today = date;

                for (var i = 0; i < jsonData.length; i++) {

                    if (new Date(jsonData[i].date).getDate() != today.getDate()) continue;

                    if (jsonData[i].wattage == null) continue;

                    var index = new Date(jsonData[i].date).getUTCHours()

                    if (index === -1) continue;

                    if (index != previous) {
                        //console.log("Count:" + count + " Sum:" + sum + "index: " + index)
                        data[previous] = ((sum / count) / 1000) * 3600 ;
                        previous = index;
                        sum = 0;
                        count = 1;
                    } else {
                        count++;
                    }
                    sum += parseInt(jsonData[i].wattage);
                }
                data[previous] = ( ((sum / count) / 1000)* 3600);
                console.log("This is THE data your looking for: " + previous);
                callback(data);
            }
        }
    });
}

setInterval(GenerateChart, 10000);
GenerateChart(0);

var chartState;
function GenerateChart(chartType){


    if(chartType != null) {
        chartState = chartType;
    }

    var labels = [];
//Days
    if(chartState == 0) {
        labels =  ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
            "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

        getDayData(function (data, previousData) {
            window.chartOptions = {
                animation: false
            };

            var buyerData = {
                labels: labels,
                datasets: [
                    {
                        fillColor: "rgba(172,194,132,0.4)",
                        strokeColor: "#ACC26D",
                        pointColor: "#fff",
                        pointStrokeColor: "#9DB86D",
                        data: data
                    },
                    {
                        fillColor: "rgba(200,50,50,0.4)",
                        strokeColor: "#B1C26D",
                        pointColor: "#0ff",
                        pointStrokeColor: "#9DB86D",
                        data: previousData
                    }

                ]
            };

            var buyers = document.getElementById('buyers').getContext('2d');
            lineChart = new Chart(buyers).Line(buyerData, window.chartOptions);

        })
    }
// Month
    if(chartState == 1) {


        var date = new Date();
        var numberOfDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


        for (var i = 1; i <= numberOfDaysInMonth; i++) {
            labels.push(i);
        }
        getMonthData(function (data, previousData) {
            window.chartOptions = {
                animation: false
            };

            var buyerData = {
                labels: labels,
                datasets: [
                    {
                        fillColor: "rgba(172,194,132,0.4)",
                        strokeColor: "#ACC26D",
                        pointColor: "#fff",
                        pointStrokeColor: "#9DB86D",
                        data: data
                    },
                    {
                        fillColor: "rgba(200,50,50,0.4)",
                        strokeColor: "#B1C26D",
                        pointColor: "#0ff",
                        pointStrokeColor: "#9DB86D",
                        data: previousData
                    }

                ]
            };

            var buyers = document.getElementById('buyers').getContext('2d');
            lineChart = new Chart(buyers).Line(buyerData, window.chartOptions);

        })
    }
// Year
    if(chartState == 2) {


        var date = new Date();

        labels = ["Jan","feb","mar","apr", "may","jun","jul","aug","sep","oct","nov","des"];

        getYearData(function (data, previousData) {
            window.chartOptions = {
                animation: false
            };

            var buyerData = {
                labels: labels,
                datasets: [
                    {
                        fillColor: "rgba(172,194,132,0.4)",
                        strokeColor: "#ACC26D",
                        pointColor: "#fff",
                        pointStrokeColor: "#9DB86D",
                        data: data
                    },
                    {
                        fillColor: "rgba(200,50,50,0.4)",
                        strokeColor: "#B1C26D",
                        pointColor: "#0ff",
                        pointStrokeColor: "#9DB86D",
                        data: previousData
                    }

                ]
            };

            var buyers = document.getElementById('buyers').getContext('2d');
            lineChart = new Chart(buyers).Line(buyerData, window.chartOptions);

        })
    }
}

var pieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]

//var devices = document.getElementById("devices").getContext("2d");

//new Chart(devices).Doughnut(pieData);



/*

var barData = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "#48A497",
            strokeColor : "#48A4D1",
            data : [456,479,324,569,702,600]
        },
        {
            fillColor : "rgba(73,188,170,0.4)",
            strokeColor : "rgba(72,174,209,0.4)",
            data : [364,504,605,400,345,320]
        }

    ]
}

var income = document.getElementById("income").getContext("2d");
new Chart(income).Bar(barData);

*/

