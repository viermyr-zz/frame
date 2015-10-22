function addStock(){
    var ticker = document.getElementById("stockTicker").innerHTML;
    alert(ticker);
    return ticker;

}
var getStocksInfo = function(){
    $.ajax({
        url: "http://localhost:8082/api/stocks",
        success: function(parsed_json){

            var tickerName;
            var lastTradePrice;
            var openPrice;
            var percentageChange;
            var count = 1;

            for (var i = 0; i < parsed_json.length;i++){
                tickerName           = parsed_json[i].symbol;
                lastTradePrice      = parsed_json[i].lastTradePriceOnly;
                openPrice           = parsed_json[i].open;
                percentageChange    = parsed_json[i].changeInPercent * 100;

                document.getElementById("stockName" +count).innerHTML = tickerName.toString();
                document.getElementById("stockLatest"+count).innerHTML = lastTradePrice.toFixed(1);
                document.getElementById("stockOpen"+count).innerHTML = openPrice.toFixed(1);
                document.getElementById("stockChange"+count).innerHTML = percentageChange.toFixed(1);
                count++;
            }
        },
        error: function(err){
            console.log(err);
        }
    });
};
getStocksInfo();
setInterval(getStocksInfo,60000);