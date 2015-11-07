
//var http = require('http');

jQuery(document).ready(function($) {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 925 - margin.left - margin.right,
        height = 268 - margin.top - margin.bottom;

    var xa = d3.scale.ordinal()
        .domain(["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
            "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"])
        .rangePoints([0, width]);


    var xAxis = d3.svg.axis()
        .scale(xa)
        .orient("bottom");

    var y = d3.scale.linear()
        .range([height, 0]);

    var x = d3.scale.linear()
        .range([0, width]);


    var svg = d3.select("svg#area")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    initRender();
    setInterval(renderUpdate, 10000)

    function getData(callback) {
        $.ajax({
            url: "http://localhost:8082/api/wattagePrHour/",
            success: function (jsonData) {

                var currentDaydata = [];
                var previousDayData = [];

                var date = new Date();
                fillData(currentDaydata, date, function(data){
                    date.setDate(date.getDate() - 1);
                    fillData(previousDayData, date, function(previousData){
                        callback(data, previousData);
                    })
                });

                function fillData(data, date, callback){
                    for (var j = 0; j < 24; j++) {
                        data.push({x: j, y: 0});
                    }

                    var previous = 0;
                    var count = 1;
                    var sum = 0;
                    var today = date;
                    for (var i = 0; i < jsonData.length; i++) {

                        if(new Date(jsonData[i].date).getDate() != today.getDate())continue;
                        if (jsonData[i].wattage == null) continue;

                        var index = new Date(jsonData[i].date).getHours();

                        if (index === -1) continue;
                        sum += parseInt(jsonData[i].wattage);

                        if (index != previous) {
                            console.log("Count:" + count + " Sum:" + sum + "index: " + index)
                            data[previous] = ({x: previous, y: ((sum / count) / 1000)* 3600}) ;
                            previous = index;
                            sum = 0;
                            count = 1;

                        } else {
                            count++;
                        }
                    }
                    data[previous] = ({x: previous, y: ((sum / count) / 1000)* 3600});
                    console.log(data)
                    callback(data);
                }

            }
        });
    }

    function initRender() {

        getData(function (data, previousData) {
            x = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                    return d.x;
                })])
                .range([0, width]);

            y.domain([0, d3.max(data, function (d) {
                if(d.y === 0){
                    return d3.max(previousData, function(d2){
                        if(d2.y === 0) return 50;
                        return d2.y * 1.5;
                    })
                }else {
                    return d.y * 1.5;
                }
            })]);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var area = d3.svg.area()
                .x(function (d) {
                    return x(d.x);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.y);
                });

            svg.append("path")
                .datum(previousData)
                .style("fill", "red")
                .attr("class", "area")
                .attr("d", area);

            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);



            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("y", -12)
                .attr("x", 850)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Time (Hours)");


            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Consumption (kw/h)");
        })
    }

    function renderUpdate(){

        getData(function(data, previousData){
            y.domain([0, d3.max(data, function (d) {
                if(d.y === 0){
                    return d3.max(previousData, function(d2){
                        if(d2.y === 0) return 50;
                        return d2.y * 1.5;
                    })
                }
                return d.y * 1.5;
            })]);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            svg.selectAll(".y.axis").remove();

            svg.append("g").attr("class","y axis").call(yAxis);

            svg.selectAll(".area").remove();

            var area = d3.svg.area()
                .x(function (d) {
                    return x(d.x);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.y);
                });

            svg.append("path")
                .datum(previousData)
                .style("fill", "red")
                .attr("class", "area")
                .attr("d", area);

            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);
        })
    }
});

