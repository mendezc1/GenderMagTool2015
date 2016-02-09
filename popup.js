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

//Adds a checkbox for each of the five facets to element
//Takes question number as input
function addFacetCheckboxes(element, questionNumber) {
	var questionNumber = questionNumber + 1;
	
	var facets = ["Motivation", "InformationProcessingStyle", "Computer Self-Efficacies",
		"Attitude Towards Risk", "Willingness to Tinker"];
	
	for (var facet = 0; facet < facets.length; facet++) {
		//Checkbox
		$("<input/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + questionNumber + "F" + facet,
			type: "checkbox",
			value: facets[facet]
		}).appendTo(element);
	
		//Label for Checkbox
		$("<span/>", { html: facets[facet] }).appendTo(element);
		
		$("<br>").appendTo(element);
	}
	
	$("<br>").appendTo(element);
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
		
		//Add response field for yes
		var yesResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "YesResponse",
			placeholder: "Why?"
		}).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add checkboxes for facets
		addFacetCheckboxes(container, i);
		
		//Add "No" checkbox
		var noCheckbox = $("<input/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "noCheckbox",
			type: "checkbox",
		    value: "No"
		}).appendTo(container);
		
		//Add label for "No" checkbox
		var noLabel = $("<span/>", { html: "No" }).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add response field for no
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "NoResponse",
			placeholder: "Why not?"
		}).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add checkboxes for facets
		addFacetCheckboxes(container, i);
		
		//Add "Maybe" checkbox
		var noCheckbox = $("<input/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "maybeCheckbox",
			type: "checkbox",
		    value: "Maybe"
		}).appendTo(container);
		
		//Add label for "Maybe" checkbox
		var noLabel = $("<span/>", { html: "Maybe" }).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add response field for maybe
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "maybeResponse",
			placeholder: "Why maybe?"
		}).appendTo(container);
		
		$("<br>").appendTo(container);
		
		//Add checkboxes for facets
		addFacetCheckboxes(container, i);
		
		container.appendTo(element);
	}
}

$(document).ready(function() {
	$("#viewPersona").hide();
	
	$("#getAction").children().hide();	
	$("#getTask").children().fadeTo(0, 0.6).attr("disabled",  true);
	$("#getSubtask").children().fadeTo(0, 0.6).attr("disabled",  true);
	
	$('#screenShot').click(takeScreenShot());
	
	//Get persona name
	$("#submitPersona").click(function() {
		personaName = $("#personaSelection").val();
		$("#personaName").html(personaName + "<br>");
		
		if ((personaName == "Tim") || (personaName == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		
		$("#getPersona").children().remove();
		$("#getPersona").remove();
		
		//Show task
		$("#getTask").children().fadeTo(500, 1).attr("disabled", false);
		$("#taskPrompt").html("Enter a task for " + personaName + " to perform");
		
		//Show button to view persona
		$("#viewPersona").show().html("View " + personaName);
		
	});
	
	//Get task name
	$('#submitTask').click(function() {
		var taskName = $("#taskInput").val();
		$("#taskName").html(taskName + "<br>");
		
		$("#getTask").children().remove();
		$("#getTask").remove();
		
		//Show subtask
		$("#getSubtask").children().fadeTo(500, 1).attr("disabled",  false);
		$("#subtaskPrompt").html("Enter a subgoal for " + personaName + " to perform");
		
	});
	
	//Get Subtask
	$("#submitSubtask").click(function() {
		numSubtasks++;
		numActions = 0; //reset
			
		//Container for this subtask
		var subtask = $("<div/>", { id: "S" + numSubtasks });
		
		//Label for this subtask
		var label = $("<label/>", { id: "S" + numSubtasks + "Name",
			html: $("#subtaskInput").val() });
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
		
		$("#getAction").children().fadeTo(500, 1).attr("disabled",  false);
	});
	
	//Show persona details
	$("#viewPersona").click(function() {
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
		
		//Actions for current subgoal
		var actions = $("#S" + numSubtasks + "Actions");
		
		//Add this action
		var action = $("<div/>", {
			id: "S" + numSubtasks + "A" + numActions
		}).appendTo(actions);
		
		//Add action name to container
		$("<span/>", { html: actionName + "<br>",
			id: "S" + numSubtasks + "A" + numActions + "Name"
		}).appendTo(action);
		
		var actionQuestions = $("<div/>", {
			id: "S" + numSubtasks + "A" + numActions + "Questions"
		}).appendTo(action);
			
		var question1 = "Will " + personaName + " even notice that the correct action is available?<br>";
		var question2 = "Will " + personaName + " associate the correct action with the effect " + 
		                pronoun + " is trying to achieve?<br>";
		var question3 = "If the correct action is performed will " + 
		                personaName + " see that progress is being made toward a solution to " + 
		                possessive + " subgoal?<br>";

		var questions = [question1, question2, question3];
			
		//Add questions and response fields to ideal action
		addQuestions(actionQuestions, questions);	
		
		//Reset form
		$("#actionInput").val("");
	
	});
});
