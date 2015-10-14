var dataArray = [10, 30, 45, 60, 30, 100];

var width = 400;
var height = 500;
var widthScale = d3.scale.linear()
    .domain([0, 60])
    .range([0, width]);

var color = d3.scale.linear()
    .domain([0, 100])
    .range(["yellow", "green"]);

var axis = d3.svg.axis()

    .ticks(5)
    .orient("right")
    .scale(widthScale);


var canvas = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(20, 0)");


    .data(dataArray)
    .enter()
    .append("rect")
    .attr("width", function(d){ return widthScale(d); })
    .attr("height", 20)
    .attr("fill", function(d){ return color(d); })
    .attr("y", function(d, i){ return i * 30});

canvas.append("g")
    .attr("transform", "translate(350, 0)")
    .call(axis);