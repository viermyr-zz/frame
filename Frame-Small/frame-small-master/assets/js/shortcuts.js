var securityMode = false;
function alertSecurity () {
	if(securityMode){
		swal("Security system is turned OFF", "Welcome home!", "success");
		document.getElementById("security-btn").style.backgroundColor = "#C0C0C0";
		securityMode = false;
	} else if(!securityMode){
		swal("Security system is ON", "You have 20 seconds to leave the house!", "success");
    	document.getElementById("security-btn").style.backgroundColor = "#449D44";
    	securityMode = true;
	}
}

var coffeeMaker = false;
function toggleCoffeeMaker(){
    if(coffeeMaker){
        swal("The coffee maker is now turned OFF", "You can now relax =)", "success");
        document.getElementById("coffee-maker").style.backgroundColor = "#C0C0C0";
        	coffeeMaker = false;
    } else if(!coffeeMaker){
        swal("The coffee maker is now turned ON", "Ready in 5 minutes", "success");
        document.getElementById("coffee-maker").style.backgroundColor = "#449D44";
        coffeeMaker = true;
    }
}