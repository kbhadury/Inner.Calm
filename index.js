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
			//Notifications supported, check if we need permission
			} else if(Notification.permission !== "granted"){
				Notification.requestPermission(function(permission){
					if(permission === "granted"){
						//Permitted, toggle button and start interval timer
						$("#start").text("Stop notifications");
						var n = new Notification("This is a sample notification!", {icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg"});
						intervalFunc = setInterval(notify, interval);
					} else {
						//Not permitted, disable button
						enableNotifications = false;
						$("#start").text("Notifications not permitted").prop("disabled",true);
						return;
					}
				});
			//Notifications supported and already permitted
			} else {
				//Toggle button, start interval timer
				$("#start").text("Stop notifications");
				var n = new Notification("This is a sample notification!", {
					icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
					body: "You'll be asked to get up and stretch every 20 minutes"});
				intervalFunc = setInterval(notify, interval);
			}	
		}
	});
};

function notify(){
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
	
	var exerciseIndex = Math.floor(Math.random()*8); //Choose a random exercise
	
	//Create the notification
	var notification = new Notification("Get up and stretch!",{
		body: "Why not try a " + exercises[exerciseIndex] + "? Click me!",
		icon: "http://worldartsme.com/images/meditating-buddha-clipart-1.jpg",
		requireInteraction: true}); //Don't automatically close
		
	notification.onclick = function(){
		notification.close();
		//Add stretch to running list
		var date = new Date();
		var hrs = date.getHours();
		var ampm = "am";
		if(hrs >= 12){
			hrs = hrs-12;
			ampm = "pm";
		}
		if(hrs == 0){
			hrs = 12;
		}
		var completedStr = "<li>" + hrs + ":" + date.getMinutes() + ampm + " - You completed " + exercises[exerciseIndex] + "!</li>";
		$(".list").prepend($(completedStr));
		window.open(linkPrefix + links[exerciseIndex]);
	};
};

$(document).ready(main);
