var personaName = "";

function takeScreenShot() {

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

function showQuestionForSubgoal() {
	var subgoalQuestion = document.getElementById("questionForSubgoal");
	subgoalQuestion.innerHTML = "Will " + personaName + " have formed this subgoal as a step to the overall goal?<br>";
	var checkYes = document.createElement("input");
	var yes = document.createElement("span");
	var yesResponse = document.createElement("textArea");
	yes.innerHTML = "Yes";
	var no = document.createElement("span");
	no.innerHTML = "No";
	var checkNo = document.createElement("input");
	var noResponse = document.createElement("textArea");
	checkYes.type = "checkbox";
	checkNo.type = "checkbox";
	checkYes.value = "Yes";
	checkNo.value = "No";
	subgoalQuestion.appendChild(checkYes);
	subgoalQuestion.appendChild(yes);
	var linebreak1 = document.createElement("br");
	subgoalQuestion.appendChild(linebreak1);
	subgoalQuestion.appendChild(yesResponse);
	var linebreak2 = document.createElement("br");
	subgoalQuestion.appendChild(linebreak2);
	subgoalQuestion.appendChild(checkNo);
	subgoalQuestion.appendChild(no);
	var linebreak3 = document.createElement("br");
	subgoalQuestion.appendChild(linebreak3);
	subgoalQuestion.appendChild(noResponse);
}

document.getElementById('clickme').addEventListener('click', takeScreenShot);

//document.getElementById('motivationsLink').href="abbyMotivations"
//get persona's name
document.querySelector('#btnSubmitPersona').addEventListener('click', function(e) {
		personaName = document.querySelector('option:checked').value;
		chrome.extension.getBackgroundPage().console.log("Persona ", personaName)
		document.getElementById('personaName').innerHTML = "You selected " + personaName + " as your persona";
		var parent = document.getElementById('section1');
		var child = document.getElementById('personaSelection');
		parent.removeChild(child);
		child = document.getElementById('btnSubmitPersona');
		parent.removeChild(child)
		document.getElementById("subtaskPrompt").innerHTML = "Select a subtask for " + personaName + " to perform"
		
	
		
		
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

// Get subtask name
document.getElementById('btnSubmitSubtask').addEventListener('click', function(e) {
		var subtaskName = document.getElementById("subtaskInput").value;
		chrome.extension.getBackgroundPage().console.log("Subtask: ", subtaskName);
		document.getElementById("subtaskName").innerHTML = "You selected " + subtaskName + " as your subtask";
		
		showQuestionForSubgoal();
		
		document.getElementById("subtaskInput").remove();
		document.getElementById("btnSubmitSubtask").remove();
		
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);

document.getElementById('btnTogglePersona').addEventListener('click', function(e){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSidebar"}, function(response) {
			chrome.extension.getBackgroundPage().console.log("resp ", response);
			});
		});
});

// Add ideal action
document.getElementById('addIdealAction').addEventListener('click', function(e) {
}, false);

