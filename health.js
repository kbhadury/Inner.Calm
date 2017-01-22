var main = function(){
	beenClicked = false;
	count = 0;
	enableNotifications = false;
	
	$("#mybutton").click(function(){
		alert("Success!");
	});
	
	$("#addbutton").click(function(){
		if(!beenClicked){
			beenClicked = true;
			setInterval(addItem, 1000*60);
		}
	});
	
	$("#notifybutton").click(function(){
		enableNotifications = !enableNotifications; //Toggle notifications
		
		//Disable notifications
		if(!enableNotifications){
			//clearInterval(intervalFunc);
			$("#notifybutton").text("Notify me");
		
		//Enable notifications
		} else {
			//Check if notifications are supported
			if(!Notification){
				//Not supported, disable button
				alert("Notifications are not supported in your browser");
				enableNotifications = false;
				$("#notifybutton").text("Notifications not supported").prop("disabled",true);
				return;
			} else if(Notification.permission !== "granted"){
				Notification.requestPermission(function(permission){
					if(permission === "granted"){
						$("#notifybutton").text("Stop notifying me!");
						var n = new Notification("Hi!");
						intervalFunc = setInterval(doNotify, 1000*5);
					} else {
						//Not permitted, disable button
						enableNotifications = false;
						$("#notifybutton").text("Notifications not permitted").prop("disabled",true);
						return;
					}
				});
			} else {
				$("#notifybutton").text("Stop notifying me!");
				var n = new Notification("Hi!");
				intervalFunc = setInterval(doNotify, 1000*5);
			}	
		}
	});
};

function addItem(){
	$("#mydiv").append($("<p>This is number " + count + "</p>"));
	count = count + 1;
};

function doNotify(){
	var notification = new Notification("Here's the title!",{body: "The count is " + count});
	count = count + 1;
}

$(document).ready(main);
