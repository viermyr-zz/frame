function getYearData(callback) {

    var startDate = new Date();
    startDate.setMonth(1);
    var getDataFromDate = new Date();
    getDataFromDate.setYear(startDate.getYear()  - 1);
    getDataFromDate.setMonth(1);
    var labels = ["Jan","feb","mar","apr", "may","jun","jul","aug","sep","oct","nov","des"];


    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/" + getDataFromDate,
        success: function (jsonData) {

            var currentYearData = [];
            var previousYearData = [];

            fillData(currentYearData, startDate, function(data){
                startDate.setFullYear(startDate.getFullYear() - 1);

                fillData(previousYearData, startDate, function(previousData){
                    callback(labels, data, previousData);
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
                callback(data);
            }
        }
    });
}
function getMonthData(callback) {
    var getDataFromDate = new Date();
    getDataFromDate.setMonth(getDataFromDate.getMonth() - 1);
    getDataFromDate.setDate(1);

    var startDate = new Date();
    startDate.setDate(1);

    var numberOfDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    var labels = [];
    for (var i = 1; i <= numberOfDaysInMonth; i++) {
        labels.push(i);
    }

    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/" + getDataFromDate,
        success: function (jsonData) {

            var currentDayData = [];
            var previousDayData = [];

            var now = new Date();
            fillData(currentDayData, startDate, now, function(data){
                startDate.setMonth(startDate.getMonth() - 1);
                var lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                var previousMonthFirst = new Date(startDate.getYear(),startDate.getMonth(), 1);
                var previousMonthLast = new Date(startDate.getYear(),startDate.getMonth(), lastDayOfMonth.getDate());

                fillData(previousDayData, previousMonthFirst, previousMonthLast, function(previousData){
                    callback(labels, data, previousData);
                })
            });

            function fillData(data, startDate, date, callback){

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
                callback(data);
            }
        }
    });
}
function getWeekData(callback) {
    var startDate = new Date();
    var endDate = new Date();
    startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7);
    endDate.setDate(startDate.getDate() + 7);
    var getDataFromDate = new Date();
    getDataFromDate.setDate(startDate.getDate() - 7);

    console.log(getDataFromDate);
    var labels =  ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"]

    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/" + getDataFromDate,
        success: function (jsonData) {

            var currentDayData = [];
            var previousDayData = [];

            fillData(currentDayData, startDate, endDate, function(data){
                startDate.setDate(startDate.getDate() - 7);
                endDate.setDate(startDate.getDate() + 6);
                fillData(previousDayData, startDate, endDate, function(previousData){
                    callback(labels, data, previousData);
                })
            });

            function fillData(data, startDate, endDate, callback){
                for (var j = 0; j < 7; j++) {
                    data.push(0);
                }

                var previous = -1;
                var count = 1;
                var sum = 0;

                for (var i = 0; i < jsonData.length; i++) {

                    var inScope = false;

                    var hasChangeInMonthCondition = endDate.getDate();
                    if(endDate.getMonth() != startDate.getMonth()){
                        hasChangeInMonthCondition = endDate.getDate() + startDate.getDate();
                    }
                    for(var j = startDate.getDate(); j < hasChangeInMonthCondition; j++ ) {
                        if (new Date(jsonData[i].date).getDate() == j) {
                            inScope = true;
                            break;
                        }
                    }
                    if(!inScope) {
                        continue;
                    }

                    if (jsonData[i].wattage == null) continue;
                    // Change 1 - 7 to 0 - 6
                    var index = new Date(jsonData[i].date).getDay() - 1;
                    if (index === -1) continue;

                    if (index != previous) {
                        //console.log("Count:" + count + " Sum:" + sum + "index: " + index)
                        data[previous] = ((sum / count) / 1000) * 3600;
                        previous = index;
                        sum = 0;
                        count = 1;
                    } else {
                        count++;
                    }
                    sum += parseInt(jsonData[i].wattage);
                }
                data[previous] = ( ((sum / count) / 1000) * 3600);
                callback(data);
            }
        }
    });
}
function getDayData(callback) {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);

    var getDataFromDate = new Date();
    getDataFromDate.setDate(getDataFromDate.getDate() -1);
    getDataFromDate.setHours(0);
    getDataFromDate.setMinutes(0);

    $.ajax({
        url: "http://localhost:8082/api/wattagePrHour/" + getDataFromDate,
        success: function (jsonData) {

            var labels =  ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
                "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

            var currentDayData = [];
            var previousDayData = [];

            fillData(currentDayData, date, function(data){
                date.setDate(date.getDate() - 1);
                fillData(previousDayData, date, function(previousData){
                    callback(labels ,data, previousData);
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
                callback(data);
            }
        }
    });
}

setInterval(GenerateChart, 1000 * 60);
GenerateChart(0);

var chartState;


function getDevices(){
    $.ajax({
        url: "http://localhost:8082/api/getDevices/",
        success: function (jsonData) {
            document.getElementById('oLights').innerHTML = jsonData;
        },
        error: function(err){
            console.log(err);
        }
    })
}
function CalculateKWH(){
    getDayData(function(labels, data, previousData) {
        average(data, function(value){
            document.getElementById('kwhPrHr').innerHTML = Math.floor(value);
        });
    })

    getMonthData(function(labels, data, previousData) {
        sum(data, function(value){
            document.getElementById('kwhPrDay').innerHTML = Math.floor(value);
        });
    })

    getMonthData(function(labels, data, previousData) {
        sum(data, function(value){
            document.getElementById('kwhPrWeek').innerHTML = Math.floor(value * 7);
        });
    })

    getMonthData(function(labels, data, previousData) {
        sum(data, function(value){
            document.getElementById('kwhPrMonth').innerHTML = Math.floor(value * 7 * 4);
        });
    })
}

function average(data, callback){
    var sum = 0;
    var i = 0;
    for(; i < data.length; i++){
        if(data[i] != 0)
            sum += data[i];
    }
    var kwhPr = sum / i;
    callback(kwhPr);
}

function sum(data, callback){
    var sum = 0;
    var i = 0;
    for(; i < data.length; i++){
        if(data[i] != 0)
            sum += data[i];
    }
    var kwhPr = sum;
    callback(kwhPr);
}

function GenerateChart(chartType){

    if(chartType != null) {
        chartState = chartType;
    }
    CalculateKWH()
    getDevices()

//Days
    if(chartState == 0) {
        getDayData(setupLineChart);

    }
//Week
    if(chartState == 1) {
        getWeekData(setupLineChart);
    }
// Month
    if(chartState == 2) {
        getMonthData(setupLineChart);
    }
// Year
    if(chartState == 3) {
        getYearData(setupLineChart);
    }
}
var lineChart;
function setupLineChart(labels, data, previousData) {
    if(lineChart != undefined){
        lineChart.destroy();
    }

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

};
