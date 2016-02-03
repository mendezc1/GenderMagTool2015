
function takeScreenShot() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSidebar"}, function(response) {
		chrome.extension.getBackgroundPage().console.log("resp ", response);
		});
	});
	chrome.extension.getBackgroundPage().console.log("logging");
	chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url ", imgUrl);   
			//chrome.extension.getBackgroundPage().console.log("your url here");
      });    
	}); 
//more permanant change
//chrome.browserAction.setPopup({popup: "new.html"});
}
document.getElementById('clickme').addEventListener('click', takeScreenShot);

//get persona's name
document.querySelector('#btnSubmitPersona').addEventListener('click', function(e) {
		var personaName = document.querySelector('option:checked');
		chrome.extension.getBackgroundPage().console.log("Persona ", personaName.value)
		document.getElementById('personaName').innerHTML = "You selected " + personaName.value + " as your persona";
		var parent = document.getElementById('section1');
		var child = document.getElementById('personaSelection');
		parent.removeChild(child);
		child = document.getElementById('btnSubmitPersona');
		parent.removeChild(child)
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);

// Get task name
document.getElementById('btnSubmitTask').addEventListener('click', function(e) {
		var taskName = document.getElementById("taskInput").value;
		chrome.extension.getBackgroundPage().console.log("Task: ", taskName);
		document.getElementById("taskName").innerHTML = "You selected " + taskName + " as your task";
		document.getElementById("taskInput").remove();
		document.getElementById("btnSubmitTask").remove();
		
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);
