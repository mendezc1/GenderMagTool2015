function takeScreenShot() {
	chrome.extension.getBackgroundPage().console.log("logging");
	chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log(imgUrl);                                            
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
		//Change popup.html to test.html
		window.location.href="test.html";
}, false);
