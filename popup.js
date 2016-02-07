var personaName = "";

function takeScreenShot() {
	chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url ", imgUrl);   
      });    
	}); 
//more permanant change
//chrome.browserAction.setPopup({popup: "new.html"});
}


//Adds a series of questions to element
//Under each question, checkboxes for a yes/no response and fields for explanation
function showQuestions(element, questions) {
	chrome.extension.getBackgroundPage().console.log(questions.length);

	for (var i = 0; i < questions.length; i++) {
		var question = document.createElement("span");
		question.innerHTML = questions[i];
		element.appendChild(question);
	
		var yesCheckbox = document.createElement("input");
		yesCheckbox.type = "checkbox";
		yesCheckbox.value = "Yes";
		var yesLabel = document.createElement("span");
		yesLabel.innerHTML = "Yes";
		var yesResponse = document.createElement("textArea");
		
		var noCheckbox = document.createElement("input");
		noCheckbox.type = "checkbox";
		noCheckbox.value = "No";
		var noLabel = document.createElement("span");
		noLabel.innerHTML = "No";
		var noResponse = document.createElement("textArea");
		
		element.appendChild(yesCheckbox);
		element.appendChild(yesLabel);
		element.appendChild(document.createElement("br"));
		element.appendChild(yesResponse);
		element.appendChild(document.createElement("br"));

		element.appendChild(noCheckbox);
		element.appendChild(noLabel);
		element.appendChild(document.createElement("br"));
		element.appendChild(noResponse);
		element.appendChild(document.createElement("br"));

	}
}

document.getElementById('screenShot').addEventListener('click', takeScreenShot);

//document.getElementById('motivationsLink').href="abbyMotivations"

//Get Persona
document.querySelector('#submitPersona').addEventListener('click', function(e) {
		personaName = document.querySelector('option:checked').value;
		chrome.extension.getBackgroundPage().console.log("Persona ", personaName)
		document.getElementById('personaName').innerHTML = personaName;
		
		document.getElementById('personaSelection').remove();
		document.getElementById('submitPersona').remove();
		document.getElementById('personaPrompt').remove();
		
		document.getElementById("subtaskPrompt").innerHTML = "Select a subtask for " + personaName + " to perform";

		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);


//Get Task
document.getElementById('submitTask').addEventListener('click', function(e) {
		var taskName = document.getElementById("taskInput").value;
		chrome.extension.getBackgroundPage().console.log("Task: ", taskName);
		document.getElementById("taskName").innerHTML = taskName;
		
		document.getElementById("taskInput").remove();
		document.getElementById("taskPrompt").remove();
		document.getElementById("submitTask").remove();
				
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);


//Get Subtask
document.getElementById('submitSubtask').addEventListener('click', function(e) {
		var subtaskName = document.getElementById("subtaskInput").value;
		chrome.extension.getBackgroundPage().console.log("Subtask: ", subtaskName);
		document.getElementById("subtaskName").innerHTML = subtaskName;
		
		var question = ["Will " + personaName + " have formed this subgoal as a step to the overall goal?<br>"];
		showQuestions(document.getElementById("questionForSubgoal"), question);
		
		document.getElementById("subtaskInput").remove();
		document.getElementById("submitSubtask").remove();
		
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


//Add ideal action
document.getElementById('addAction').addEventListener('click', function(e) {
	var question1 = "Will " + personaName + " even notice that the correct action is available?<br>";
	var question2 = "Will " + personaName + " associate the correct action with the effect she is trying to achieve?<br>";
	var question3 = "If the correct action is performed will " + personaName + " see that progress is being made toward a solution to his/her subgoal?<br>";
	
	var questions = [question1, question2, question3];
	
	var idealActions = document.getElementById("idealActions");
	var idealAction = document.createElement("div");
	idealActions.appendChild(idealAction);
	
	var actionName = document.createElement("span");
	var actionNameInput = document.getElementById("actionNameInput");
	actionName.innerHTML = actionNameInput.value + "<br>";
	
	idealAction.appendChild(actionName);
	
	showQuestions(idealAction, questions);
	
	actionNameInput.value = "";
	
}, false);
