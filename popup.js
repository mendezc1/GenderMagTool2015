function takeScreenShot() {

	chrome.runtime.sendMessage(
			//Selected tab id
			//Params inside a object data
			{callFunction: "toggleSidebar"},
			//Optional callback function
			function(response) {
				chrome.extension.getBackgroundPage().console.log("response", response);
			}
	);
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
document.querySelector('#btnSubmit').addEventListener('click', function(e) {
		var personaName = document.querySelector('option:checked');
		chrome.extension.getBackgroundPage().console.log("Persona ", personaName.value)
		document.getElementById('personaName').innerHTML = "You selected " + personaName.value + " as your persona";
		var parent = document.getElementById('section1');
		var child = document.getElementById('personaSelection');
		parent.removeChild(child);
		child = document.getElementById('btnSubmit');
		parent.removeChild(child)
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);
