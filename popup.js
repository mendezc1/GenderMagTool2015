var personaName = "";
var numSubtasks = 0;
var numActions = 0;


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
		var container = document.createElement("div");
		container.class = question;
		
		var question = document.createElement("span");
		question.innerHTML = questions[i];
		container.appendChild(question);
	
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
		
		container.appendChild(yesCheckbox);
		container.appendChild(yesLabel);
		container.appendChild(document.createElement("br"));
		container.appendChild(yesResponse);
		container.appendChild(document.createElement("br"));

		container.appendChild(noCheckbox);
		container.appendChild(noLabel);
		container.appendChild(document.createElement("br"));
		container.appendChild(noResponse);
		container.appendChild(document.createElement("br"));
		container.appendChild(document.createElement("br"));
		
		element.appendChild(container);

	}
}

function showIdealActionForm(subtask) {
	var actionForm = document.getElementById("addIdealAction");
		
	if (!actionForm.hasChildNodes()) {
			
		actionName = document.createElement("input");
		actionName.type = "text";
		actionName.id = "actionNameInput";
		actionName.placeholder = "Action Name";
		actionForm.appendChild(actionName);
		
		var addAction = document.createElement("input");
		addAction.type = "submit";
		addAction.id = "submitAction";
		addAction.value = "Add Action to this Subtask";
		actionForm.appendChild(addAction);
		
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
		
		document.getElementById("subtaskPrompt").innerHTML = "Enter a subtask for " + personaName + " to perform";

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
		
		numSubtasks++;
		numActions = 0;
		
		var subtasks = document.getElementById("subtasks");
		
		var subtask = document.createElement("div");
		subtask.id = "subtask" + numSubtasks;
		
		var subtaskNameLabel = document.createElement("label");
		subtaskNameLabel.innerHTML = subtaskName;
		subtask.appendChild(subtaskNameLabel);

		var subtaskQuestions = document.createElement("div");
		subtaskQuestions.id = "subtask" + numSubtasks + "Questions";
		subtask.appendChild(subtaskQuestions);
	
		var question = ["Will " + personaName + " have formed this subgoal as a step to the overall goal?<br>"];
		showQuestions(subtaskQuestions, question);

		var idealActions = document.createElement("div");
		idealActions.id = "actionsForSubtask" + numSubtasks;
		subtask.appendChild(idealActions);
				
		subtasks.appendChild(subtask);
		
		document.getElementById("subtaskInput").value = "";
		document.getElementById("subtaskPrompt").innerHTML = "";
		document.getElementById("submitSubtask").value = "Add New Subtask"
		
		showIdealActionForm(subtask);
		
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
document.getElementById('addIdealAction').addEventListener('click', function(e) {
	if (event.target.id == "submitAction") {
		numActions++;
		
		var question1 = "Will " + personaName + " even notice that the correct action is available?<br>";
		var question2 = "Will " + personaName + " associate the correct action with the effect she is trying to achieve?<br>";
		var question3 = "If the correct action is performed will " + personaName + " see that progress is being made toward a solution to the subgoal?<br>";
	
		var questions = [question1, question2, question3];
	
		var idealActions = document.getElementById("actionsForSubtask" + numSubtasks);
		var idealAction = document.createElement("div");
		idealActions.appendChild(idealAction);
	
		var actionName = document.createElement("span");
		var actionNameInput = document.getElementById("actionNameInput");
		actionName.innerHTML = actionNameInput.value + "<br>";
		idealAction.appendChild(actionName);
	
		showQuestions(idealAction, questions);
	
		actionNameInput.value = "";
	}
	
}, false);
