var personaName = "";
var pronoun = "";
var possessive = "";
var numSubtasks = 0;
var numActions = 0;
var personaShown = false;


function takeScreenShot() {
	chrome.windows.getCurrent(function (win) {    
    chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url ", imgUrl);   
      });    
	}); 
//more permanant change
//chrome.browserAction.setPopup({popup: "new.html"});
}


//Adds a series of questions (array of strings) to element
//Under each question, adds checkboxes for yes/no response and fields for explanation
function showQuestions(element, questions) {

	for (var i = 0; i < questions.length; i++) {
		var container = document.createElement("div");
		container.class = question;
		container.id = "S" + numSubtasks + "A" + numActions + "Q" + (i + 1);
		
		//Add question text
		var question = document.createElement("span");
		question.innerHTML = questions[i];
		container.appendChild(question);
	
		//Add "Yes" checkbox with field for explanation
		var yesCheckbox = document.createElement("input");
		yesCheckbox.type = "checkbox";
		yesCheckbox.value = "Yes";
		yesCheckbox.id = container.id + "YesCheckbox";
		var yesLabel = document.createElement("span");
		yesLabel.innerHTML = "Yes";
		var yesResponse = document.createElement("textArea");
		yesResponse.id = container.id + "YesResponse";
		
		container.appendChild(yesCheckbox);
		container.appendChild(yesLabel);
		container.appendChild(document.createElement("br"));
		container.appendChild(yesResponse);
		container.appendChild(document.createElement("br"));
		
		//Add "No" checkbox with field for explanation
		var noCheckbox = document.createElement("input");
		noCheckbox.type = "checkbox";
		noCheckbox.value = "No";
		noCheckbox.id = container.id + "NoCheckbox"
		var noLabel = document.createElement("span");
		noLabel.innerHTML = "No";
		var noResponse = document.createElement("textArea");
		noResponse.id = container.id + "NoResponse"

		container.appendChild(noCheckbox);
		container.appendChild(noLabel);
		container.appendChild(document.createElement("br"));
		container.appendChild(noResponse);
		container.appendChild(document.createElement("br"));
		container.appendChild(document.createElement("br"));
		
		element.appendChild(container);

	}
}


//After addition of first subgoal
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
		
		if(personaShown == false){
			document.getElementById('btnTogglePersona').innerHTML = "Show " + personaName;
			personaShown = true;
		}
		else if(personaShown == true){
			document.getElementById('btnTogglePersona').innerHTML = "Hide " + personaName;	
			personaShown = false;
		}
		
		if ((personaName == "Tim") || (personaName == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		
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
		numActions = 0; //reset
		
		var subtasks = document.getElementById("subtasks");
		
		//Container for this subtask
		var subtask = document.createElement("div");
		subtask.id = "S" + numSubtasks;
		
		var subtaskNameLabel = document.createElement("label");
		subtaskNameLabel.innerHTML = subtaskName;
		subtaskNameLabel.id = "S" + numSubtasks + "Name";
		subtask.appendChild(subtaskNameLabel);

		//Container for subtask questions
		var subtaskQuestions = document.createElement("div");
		subtaskQuestions.id = "S" + numSubtasks + "Questions";
		subtask.appendChild(subtaskQuestions);
	
		//Add questions to subtask container
		var question = ["Will " + personaName + " have formed this subgoal as a step to " +
		                possessive + " overall goal?<br>"];
		showQuestions(subtaskQuestions, question);

		//Create container to hold ideal actions (questions and responses) for subtask
		var idealActions = document.createElement("div");
		idealActions.id = "S" + numSubtasks + "Actions";
		subtask.appendChild(idealActions);
				
		subtasks.appendChild(subtask);
		
		//Reset subtask form
		document.getElementById("subtaskInput").value = "";
		document.getElementById("subtaskPrompt").innerHTML = "";
		document.getElementById("submitSubtask").value = "Add New Subtask"
		
		//If not already rendered
		showIdealActionForm(subtask);
		
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);


document.getElementById('btnTogglePersona').addEventListener('click', function(e){
		if(personaShown == false){
		document.getElementById('btnTogglePersona').innerHTML = "Show " + personaName;
		personaShown = true;
	}
	else if(personaShown == true){
		document.getElementById('btnTogglePersona').innerHTML = "Hide " + personaName;	
		personaShown = false;
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSidebar"}, function(response) {
		chrome.extension.getBackgroundPage().console.log("resp ", response);
		});
	});
});


//Add ideal action
document.getElementById('addIdealAction').addEventListener('click', function(e) {
	//Submit button for ideal action form
	if (event.target.id == "submitAction") {
		
		numActions++;
		
		var question1 = "Will " + personaName + " even notice that the correct action is available?<br>";
		var question2 = "Will " + personaName + " associate the correct action with the effect " + 
		                pronoun + " is trying to achieve?<br>";
		var question3 = "If the correct action is performed will " + 
		                personaName + " see that progress is being made toward a solution to " + 
		                possessive + " subgoal?<br>";
	
		var questions = [question1, question2, question3];
	
		//Create container for this ideal action
		var idealActions = document.getElementById("S" + numSubtasks + "Actions");
		var idealAction = document.createElement("div");
		idealAction.id = "S" + numSubtasks + "A" + numActions;
	
		var actionName = document.createElement("span");
		var actionNameInput = document.getElementById("actionNameInput");
		chrome.extension.getBackgroundPage().console.log("IdealAction: ", actionNameInput.value);
		actionName.innerHTML = actionNameInput.value + "<br>";
		idealAction.appendChild(actionName);
	
		//Add questions and response fields to ideal action container
		showQuestions(idealAction, questions);
		
		//Add ideal action to subtask
		idealActions.appendChild(idealAction);
	
		//Reset ideal action form
		actionNameInput.value = "";
	}
	
}, false);
