var personaName = "";
var pronoun = "";
var possessive = "";

var numSubtasks = 0;
var numActions = 0; //reset for each subtask

function takeScreenShot() {
	chrome.windows.getCurrent(function (win) {    
    	chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url ", imgUrl);   
    	});    
	}); 
};

//Adds a series of questions (array of strings) to element
//Under each question, adds checkboxes for yes/no response and fields for explanation
function addQuestions(element, questions) {

	for (var i = 0; i < questions.length; i++) {
		var container = $("<div/>", { id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) });
		
		//Add question text
		var question = $("<span/>", { html: questions[i] }).appendTo(container);
	
		//Add "Yes" checkbox
		var yesCheckbox = $("<input/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "yesCheckbox",
			type: "checkbox",
		    value: "Yes"
		}).appendTo(container);
		
		//Add label for "Yes" checkbox
		var yesLabel = $("<span/>", { html: "Yes" }).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add response field
		var yesResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "YesResponse"
		}).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add "No" checkbox
		var noCheckbox = $("<input/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "noCheckbox",
			type: "checkbox",
		    value: "No"
		}).appendTo(container);
		
		//Add label for "No" checkbox
		var noLabel = $("<span/>", { html: "No" }).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add response field
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "NoResponse"
		}).appendTo(container);
		
		container.appendTo(element);
	}
}

$(document).ready(function() {
	$("#getPersona").children().hide();
	$("#getSubtask").children().hide();
	$("#getAction").children().hide();
	
	$('#screenShot').click(takeScreenShot());
	
	//Get task name
	$('#submitTask').click(function() {
		var taskName = $("#taskInput").val();
		$("#taskName").html(taskName);
		
		$("#getTask").children().remove();
		$("#getTask").remove();
		
		$("#getPersona").children().show();
	});
	
	//Get persona name
	$("#submitPersona").click(function() {
		var personaName = $("#personaSelection").val();
		$("#personaName").html(personaName);
		
		if ((personaName == "Tim") || (personaName == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		
		$("#getPersona").children().remove();
		$("#getPersona").remove();
		
		$("#subtaskPrompt").html("Enter a subtask for " + personaName + " to perform");
		
		$("#getSubtask").children().show();

	});
	
	//Get Subtask
	$("#submitSubtask").click(function() {
		var subtaskName = $("#subtaskInput").val();
		
		numSubtasks++;
		numActions = 0; //reset
				
		//Container for this subtask
		var subtask = $("<div/>", { id: "S" + numSubtasks });
		
		//Label for this subtask
		var label = $("<label/>", { id: "S" + numSubtasks + "Name", html: subtaskName });
		label.appendTo(subtask);

		//Container for subtask questions
		var questionContainer = $("<div/>", { id: "S" + numSubtasks + "Questions" });
		questionContainer.appendTo(subtask);
	
		var question = ["Will " + personaName + " have formed this subgoal as a step to " +
		                possessive + " overall goal?<br>"];
		
		addQuestions(questionContainer, question);

		//Container to hold ideal actions (questions and responses) for sthis ubtask
		var idealActions = $("<div/>", { id: "S" + numSubtasks + "Actions" });
		idealActions.appendTo(subtask);
		
		//Add subtask to container for all subtasks
		subtask.appendTo("#subtasks");
		
		//Reset subtask form
		$("#subtaskInput").val("");
		$("#subtaskPrompt").html("");
		$("#submitSubtask").val("Add New Subtask");
		
		$("#getAction").children().show();
	});
	
	//Show persona details
	$("#btnTogglePersona").click(function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSidebar"}, function(response) {
				chrome.extension.getBackgroundPage().console.log("resp ", response);
			});
		});
	});
	
	//Add ideal action
	$("#submitAction").click(function() {		
		numActions++;
			
		var actionName = $("#actionInput").val();
		
		//Container for this action and related questions
		var action = $("<div/>", {
			id: "S" + numSubtasks + "A" + numActions
		}).appendTo(actions);
		
		//Add action name to container
		$("<span/>", { html: actionName + "<br>" }).appendTo(action);
			
		var question1 = "Will " + personaName + " even notice that the correct action is available?<br>";
		var question2 = "Will " + personaName + " associate the correct action with the effect " + 
		                pronoun + " is trying to achieve?<br>";
		var question3 = "If the correct action is performed will " + 
		                personaName + " see that progress is being made toward a solution to " + 
		                possessive + " subgoal?<br>";

		var questions = [question1, question2, question3];
			
		//Add questions and response fields to ideal action
		addQuestions(action, questions);
		
		//Add ideal action name under actions for current subgoal
		var actions = $("#S" + numSubtasks + "Actions");	
		
		//Reset form
		$("#actionInput").val("");
	
	});
});
