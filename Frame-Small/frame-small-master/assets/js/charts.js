var buyerData = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "rgba(172,194,132,0.4)",
            strokeColor : "#ACC26D",
            pointColor : "#fff",
            pointStrokeColor : "#9DB86D",
            data : [203,156,99,251,305,247]
        }
    ]
};

var buyers = document.getElementById('buyers').getContext('2d');
new Chart(buyers).Line(buyerData);




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

var devices = document.getElementById("devices").getContext("2d");

new Chart(devices).Doughnut(pieData);

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

