

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
                    data.push(0);
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
                        data[previous] = ((sum / count) / 1000)* 3600 ;
                        previous = index;
                        sum = 0;
                        count = 1;

                    } else {
                        count++;
                    }
                }
                data[previous] = ( ((sum / count) / 1000)* 3600);
                console.log("This is THE data your looking for: " + data)
                callback(data);
            }

        }
    });
}

getData(function(data, previousData){
    var buyerData = {
        labels : ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
            "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        datasets : [
            {
                fillColor : "rgba(172,194,132,0.4)",
                strokeColor : "#ACC26D",
                pointColor : "#fff",
                pointStrokeColor : "#9DB86D",
                data : data
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
    new Chart(buyers).Line(buyerData);

})




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

