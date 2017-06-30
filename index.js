var listCount = 0;

var linkPrefix = "http://www.mayoclinic.org/healthy-lifestyle/adult-health/multimedia/stretching/sls-20076525?s=";
var exercises = [
	"a shoulder stretch",
	"an upper arm stretch",
	"a chest stretch",
	"a chin tuck",
	"a head turn",
	"a side neck stretch",
	"a lower back stretch",
	"a standing thigh stretch"];
var links = ["1","2","3","4","5","6","7","8"]; //Append to prefix

var congrats = [
	"Nice job!",
	"Way to go!",
	"Keep it up!",
	"Looking good!"];


var main = function(){
	
	var enableNotifications = false; //Disable notifications until user presses "start"
	var interval = 1000*60*20; //Notify every 20 minutes
	
	$("#notifybutton").click(function(){
		enableNotifications = !enableNotifications; //Toggle notifications
		
		//Disable notifications
		if(!enableNotifications){
			clearInterval(intervalFunc);
			$("#start").text("Start");
		
		//Enable notifications
		} else {
			
			//Check if notifications are supported
			if(!Notification){
				//Not supported, disable button
				alert("Notifications are not supported in your browser :(");
				enableNotifications = false;
				$("#start").text("Notifications not supported").prop("disabled",true);
				return;
			
			//Notifications are supported, check if we need permission
			} else if(Notification.permission !== "granted"){
				Notification.requestPermission(function(permission){
					if(permission === "granted"){
						//Permitted, toggle button and start interval timer
						$("#start").text("Stop notifications");
						var n = new Notification("This is a sample notification!", {
							icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
							body: "You'll be asked to get up and stretch every 20 minutes"});
						var n2 = new Notification("Please do not close the webpage", {
							icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
							body: "Otherwise you will not be able to receive notifications"});
						$(".list").empty();
						listCount = 0
						$("#numCompleted").html("<b>Completed exercises: 0</b>");
						intervalFunc = setInterval(notify, interval);
					} else {
						//Not permitted, disable button
						enableNotifications = false;
						$("#start").text("Notifications not permitted").prop("disabled",true);
						return;
					}
				});
			
			//Notifications are supported and already permitted
			} else {
				//Toggle button, start interval timer
				$("#start").text("Stop notifications");
				var n = new Notification("This is a sample notification!", {
					icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
					body: "You'll be asked to get up and stretch every 20 minutes"});
				var n2 = new Notification("Please do not close the webpage", {
							icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
							body: "Otherwise you will not be able to receive notifications"});
				$(".list").empty();
				listCount = 0;
				$("#numCompleted").html("<b>Completed exercises: 0</b>");
				intervalFunc = setInterval(notify, interval);
			}	
		}
	});
};

function notify(){
	//Choose a random exercise
	var exerciseIndex = Math.floor(Math.random()*8);
	
	//Create the notification
	var notification = new Notification("Get up and stretch!",{
		body: "Why not try a " + exercises[exerciseIndex] + "? Click me!",
		icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
		requireInteraction: true}); //Don't automatically close
		
	notification.onclick = function(){
		notification.close();
		
		//Get current time
		var date = new Date();
		var hrs = date.getHours();
		var mins = date.getMinutes();
		var ampm = " am";
		
		//Convert from 24-hr time to 12-hr time
		if(hrs >= 12){
			ampm = " pm";
			hrs = hrs - 12;
		}
		
		//Format minutes
		if(mins < 10){
			mins = "0" + mins;
		}
		
		//Add completed stretch to list
		var completedItem = "<div class='listitem'>" + hrs + ":" + mins + ampm + " - You completed " + exercises[exerciseIndex] + "!</div>";
		$(".list").prepend($(completedItem));
		listCount = listCount + 1;
		$("#numCompleted").html("<b>Completed exercises: " + listCount + "</b>");
		
		//Say congrats every 5 stretches (100 mins)
		if(listCount % 5 == 0){
			var congratsIndex = Math.floor(Math.random()*4);
			var notification = new Notification(congrats[congratsIndex],{
				body: "You've completed " + listCount + " exercises!",
				icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg"});
		}
		
		window.open(linkPrefix + links[exerciseIndex]);
	};
};

$(document).ready(main);
