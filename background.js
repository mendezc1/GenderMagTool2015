console.log( 'Background.html starting!' );
	/*Put page action icon on all tabs*/
//	chrome.tabs.onUpdated.addListener(function(tabId) {
//		chrome.pageAction.show(tabId);
//	});

//	chrome.tabs.getSelected(null, function(tab) {
//		chrome.pageAction.show(tab.id);
//	});
	

	chrome.runtime.sendMessage(
			//Selected tab id
			//Params inside a object data
			{callFunction: "toggleSidebar"},
			//Optional callback function
			function(response) {
				chrome.extension.getBackgroundPage().console.log("response", response);
			}
	);
console.log( 'Background.html done.' );