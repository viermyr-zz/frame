var home		= false;
var away 		= false;
var night 		= false;
var vacation 	= false;
document.getElementById("home-btn").style.backgroundColor = "#449D44";


function toggleMode(mode){
	if(mode == 'home'){
		console.log("home");
		if(home == false){
			swal("The Home Mode is now ON", "Welcome home!", "success");
			document.getElementById("home-btn").style.backgroundColor = "#449D44";
			document.getElementById("away-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("night-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("vacation-btn").style.backgroundColor = "#C0C0C0";

			home 		= true;
			away 		= false;
			night 		= false;
			vacation 	= false;
		}
	}
	if(mode == 'away'){
		console.log("away");
		if(away == false){
			swal("The Away Mode is now ON", "Have a nice trip!", "success");
			document.getElementById("home-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("away-btn").style.backgroundColor = "#449D44";
			document.getElementById("night-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("vacation-btn").style.backgroundColor = "#C0C0C0";

			home 		= false;
			away 		= true;
			night 		= false;
			vacation 	= false;
		}
	}
	if(mode == 'night'){
		console.log("night");
		if(night == false){
			swal("The Night Mode is now ON", "Good Night!", "success");
			document.getElementById("home-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("away-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("night-btn").style.backgroundColor = "#449D44";
			document.getElementById("vacation-btn").style.backgroundColor = "#C0C0C0";

			home 		= false;
			away 		= false;
			night 		= true;
			vacation 	= false;
		}
	}
	if(mode == 'vacation'){
		console.log("vacation");
		if(vacation == false){
			swal("The Vacation Mode is now ON", "Enjoy your Vacation!", "success");
			document.getElementById("home-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("away-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("night-btn").style.backgroundColor = "#C0C0C0";
			document.getElementById("vacation-btn").style.backgroundColor = "#449D44";

			home 		= false;
			away 		= false;
			night 		= false;
			vacation 	= true;
		}
	}
}
