function test(){
	console.log("Testing");	
}

function hello() {
	chrome.extension.getBackgroundPage().console.log("logging");
	chrome.tabs.captureVisibleTab(null,
            {},
            function(dataUrl)
            {
                sendResponse({imgSrc:dataUrl});
            });
}

document.getElementById('clickme').addEventListener('click', hello);
