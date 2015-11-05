/**
 * Created by Ole on 05.11.2015.
 */



$(function() {

    deviceData();
    function deviceData() {
        $.ajax({
            url: "http://localhost:8082/api/deviceInfo/",
            success: function (parsed_json) {


                console.log(parsed_json.fragment.site.lighting.on + "/" + parsed_json.fragment.site.lighting.total);
                document.getElementById('dLighting').innerHTML = parsed_json.fragment.site.lighting.on + "/" + parsed_json.fragment.site.lighting.total;

                document.getElementById('dLock').innerHTML = (parsed_json.fragment.site.security.presence);
                //console.log(parsed_json.fragment.site.temperature.inside);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});

var dataArray = [0, 30, 45, 60, 30, 20];

var width = 200;
var height = 500;

var widthScale = d3.scale.linear()
    .domain([0, 60])
    .range([0, width]);

var color = d3.scale.linear()
    .domain([0, 100])
    .range(["yellow", "green"]);

var axis = d3.svg.axis()
    .ticks(5)
    .scale(widthScale);


var canvas = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(20, 0)");

var bars = canvas.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("width", function(d){ return widthScale(d); })
    .attr("height", 20)
    .attr("fill", function(d){ return color(d); })
    .attr("y", function(d, i){ return i * 30});

canvas.append("g")
    .attr("transform", "translate(0, 175)")
    .call(axis);
