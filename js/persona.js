var sidebarOpen = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "togglePersona"){
		console.log("normal log", request);
		personaSelection = request.selection;
		selectPersona(personaSelection);
		sendResponse({farewell: "Sidebar toggled"});
	}
	else if(request.greeting == "overlayScreen"){

		selectPersona("close");
		console.log("requrest ", request)
		var elementClicked = overlayScreen();
		sendResponse({farewell: "removeScreenShotButton", userAction: elementClicked});
		
	}
  });


 function selectPersona(personaSelection){
	if(sidebarOpen) {
		console.log("closing sidebard")
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}
	else if (personaSelection == "close"){
		return; 
	}
	else{
	var sidebar = document.createElement('div');
		console.log("opening sidebard");
		sidebar.id = "mySidebar";
			document.body.appendChild(sidebar);
			sidebarOpen = true;
	}		
	
	if(personaSelection == "Abby"){
		loadAbby();
	}
	else if(personaSelection == "Tim"){
		toggleTim();
	}
	else if(personaSelection == "Patrick"){
		togglePatrick();
	}
	else if(personaSelection == "Patricia"){
		togglePatricia();
	} 
 }
 
 function loadAbby(){
	
	
//	$(target_id).html(img);
	$.get(chrome.extension.getURL("templates/abbyPersona.html"), function(html) {$("#mySidebar").append(html)});
		//abbyPhoto.src = chrome.extension.getURL("images/Abby-lowres.jpg");
	var abbySRC=chrome.extension.getURL("images/Abby-lowres.jpg");
	var abbyPhoto=$("<img />",{
		"id" : "AbbyPhoto",
		"src":abbySRC
	});
	$("#background").append(abbyPhoto);
	console.log("In loadAbby", abbyPhoto);
}

 