function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML =
        h + ":" + m;
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
function displayDate() {
    var theMonth;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    switch (month) {
        case 0:
            theMonth = "Jan";
            break;
        case 1:
            theMonth = "Feb";
            break;
        case 2:
            theMonth = "Mar";
            break;
        case 3:
            theMonth = "Apr";
            break;
        case 4:
            theMonth = "May";
            break;
        case 5:
            theMonth = "Jun";
            break;
        case 6:
            theMonth = "Jul";
            break;
        case 7:
            theMonth = "Aug";
            break;
        case 8:
            theMonth = "Sep";
            break;
        case 9:
            theMonth = "Oct";
            break;
        case 10:
            theMonth = "Nov";
            break;
        case 11:
            theMonth = "Dec";
            break;
        default:
            console.log("Error: %d is not a month?", month)
    }
    var theDateId = document.getElementById('theDate');
    theDateId.innerHTML = theMonth + " " + day;
}

var handleTimeAndDate = function(){
    startTime();
    displayDate();
    setInterval(function(){
        startTime();
        displayDate();
    }, 1000);
};
