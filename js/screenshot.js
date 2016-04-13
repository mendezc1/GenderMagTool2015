function callOverlay(){
	if(numScreenShots > 0){
		takeScreenShot();
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "overlayScreen", closeSidebar: personaShown, selection: personaName}, function(response) {
			chrome.extension.getBackgroundPage().console.log("response from script.js ", response);
			if(response.farewell == "removeScreenShotButton"){
				chrome.extension.getBackgroundPage().console.log("renaming screenshot button");
				$("#screenShot" + numSubtasks + "-" + numScreenShots).html("Retake Screenshot");
				numScreenShots++;
			}
		});
	});
}


function takeScreenShot() {
	
	var c = document.getElementById("imgCanvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("testIMG");
	ctx.drawImage(img,10,10);
	chrome.extension.getBackgroundPage().console.log("After image");
	
	chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format": "png"}, function(imgUrl) {
          screenShotURL = imgUrl
		  
		});    
	});
}