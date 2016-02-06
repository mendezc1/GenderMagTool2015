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

function showQuestions(element, questions) {
	chrome.extension.getBackgroundPage().console.log(questions.length);

	for (var i = 0; i < questions.length; i++) {
		chrome.extension.getBackgroundPage().console.log("Here!");
		var question = document.createElement("span");
		question.innerHTML = questions[i];
		element.appendChild(question);
		chrome.extension.getBackgroundPage().console.log("Here!");
	
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
	
		element.appendChild(checkYes);
		element.appendChild(yes);
		var linebreak1 = document.createElement("br");
		element.appendChild(linebreak1);
		element.appendChild(yesResponse);
		var linebreak2 = document.createElement("br");
		element.appendChild(linebreak2);
		element.appendChild(checkNo);
		element.appendChild(no);
		var linebreak3 = document.createElement("br");
		element.appendChild(linebreak3);
		element.appendChild(noResponse);
		var linebreak4 = document.createElement("br");
		element.appendChild(linebreak4);
	}
}

document.getElementById('clickme').addEventListener('click', takeScreenShot);

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
		
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSidebar"}, function(response) {
			chrome.extension.getBackgroundPage().console.log("resp ", response);
			});
		});
		
		
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
		
		var question = ["Will " + personaName + " have formed this subgoal as a step to the overall goal?<br>"];
		showQuestions(document.getElementById("questionForSubgoal"), question);
		
		document.getElementById("subtaskInput").remove();
		document.getElementById("btnSubmitSubtask").remove();
		
		//Change popup.html to test.html
		//window.location.href="test.html";
}, false);

// Add ideal action
document.getElementById('addIdealAction').addEventListener('click', function(e) {
	var question1 = "Will " + personaName + " even notice that the correct action is available?<br>";
	var question2 = "Will " + personaName + " associate the correct action with the effect she is trying to achieve?<br>";
	var question3 = "If the correct action is performed will " + personaName + " see that progress is being made toward a solution to her subgoal?<br>";
	
	var questions = [question1, question2, question3];
	
	var idealActions = document.getElementById("idealActions");
	var idealAction = document.createElement("div");
	idealActions.appendChild(idealAction);
	
	var actionName = document.createElement("span");
	var actionNameInput = document.getElementById("actionNameInput");
	actionName.innerHTML = actionNameInput.value + "<br>";
	actionName.style = "font-weight:bold";
	idealAction.appendChild(actionName);
	
	showQuestions(idealAction, questions);
	
	actionNameInput.value = "";
	
}, false);