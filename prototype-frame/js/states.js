var homestate = true;
var homeStateId = document.getElementById('homestateID');
homeStateId.innerHTML = "Home";

$('.homestate').click(function(){

    if(homestate == true){
        homeStateId.innerHTML = "Away";
        homestate = false;
    } else if(homestate == false){
        homeStateId.innerHTML = "Home";
        homestate = true;
    }

});


