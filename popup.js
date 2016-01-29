function test(){
	console.log("Testing");	
}

function takeScreenShot() {
	chrome.extension.getBackgroundPage().console.log("logging");

	chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log(imgUrl);                                            
      });    
	}); 
	 document.querySelector('#btnSubmit').addEventListener('click', function(e) {
    var personaName = document.querySelector('option:checked');
    chrome.extension.getBackgroundPage().console.log("Persona ", personaName.value)
  }, false);
  window.location.href="test.html";
//more permanant change
//chrome.browserAction.setPopup({popup: "new.html"});
}

document.getElementById('clickme').addEventListener('click', takeScreenShot);
