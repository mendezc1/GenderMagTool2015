var personaName = "";
var pronoun = "";
var possessive = "";

var numSubtasks = 0;
var numActions = 0; //reset for each subtask

var personaShown = 0; //toggle when user clicks view/hide persona button
var complete = 0;

function callOverlay(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "overlayScreen"}, function(response) {
			chrome.extension.getBackgroundPage().console.log("response from script.js ", response.farewell);
			if(response.farewell == "takeScreenShot"){
				takeScreenShot();
			}
		});
	});
}
function takeScreenShot() {

	chrome.windows.getCurrent(function (win) {    
    	chrome.tabs.captureVisibleTab(win.id,{"format": "png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url", imgUrl);   
    	});    
	}); 
};

//Adds a checkbox for each of the five facets to element
//Takes question number as input
function addFacetCheckboxes(element, questionNumber, yesNoMaybe) {
	var questionNumber = questionNumber + 1;
	
	var facets = ["Motivation", "Information Processing Style", "Computer Self-Efficacies",
		"Attitude Towards Risk", "Willingness to Tinker"];
	
	for (var facet = 0; facet < facets.length; facet++) {
		//Checkbox
		$("<input/>", {
			id: "S" + numSubtasks + "A" + numActions + "Q" + questionNumber + yesNoMaybe + "F" + facet,
			type: "checkbox",
			value: facets[facet]
		}).appendTo(element);
	
		//Label for Checkbox
		$("<span/>", { html: facets[facet] }).appendTo(element);
		
		$("<br>").appendTo(element);
	}
	
	$("<br>").appendTo(element);
};

function parseUserInput(allInput) {
	var numResponseFields = 21;
	var taskName = $("#taskName").html();

	var entry = [];
	var entries = [];
		
	lastSubgoal = null;
	lastQuestion = null;
	
	for (var i = 0; i < allInput.length; i++) { 
		if ((allInput[i]["checked"] == true) || (allInput[i]["type"] == "textarea")) {
			    
			var id = allInput[i]['id'];
			var input = allInput[i]['value'];
				
			var subgoalNumber = id[1];
			var actionNumber = id[3];
			var questionNumber = id[5];
				
			//Create a new entry for each question
			if ((questionNumber != lastQuestion) || (subgoalNumber != lastSubgoal)) {
				if (entry.length != 0) {
					entries.push(entry);
				}
					
				var subgoalName = $("#S" + subgoalNumber + "Name").html();
				var actionName = $("#S" + subgoalNumber + "A" + actionNumber + "Name").html();
				
				entry = [personaName, taskName, subgoalName, actionName, questionNumber];
					
				//Init with default value
				for (var j = 0; j < numResponseFields; j++) {
					entry.push("0");
				}
					
				lastSubgoal = subgoalNumber;
				lastQuestion = questionNumber;
			}

			var responseType = id.substring(6);
			switch(responseType) {
				case 'yesCheckbox':
					entry[5] = "1";
					break;
				case 'YesResponse':
					entry[6] = input;
					break;
				case 'YF0':
					entry[7] = "1";
					break;
				case 'YF1':
					entry[8] = "1";
					break;
				case 'YF2':
					entry[9] = "1";
					break;
				case 'YF3':
					entry[10] = "1";
					break;
				case 'YF4':
					entry[11] = "1";
					break;
				case 'noCheckbox':
					entry[12] = "1";
					break;
				case 'NoResponse':
					entry[13] = input;
					break;
				case 'NF0':
					entry[14] = "1";
					break;
				case 'NF1':
					entry[15] = "1";
					break;
				case 'NF2':
					entry[16] = "1";
					break;
				case 'NF3':
					entry[17] = "1";
					break;
				case 'NF4':
					entry[18] = "1";
					break;
				case 'maybeCheckbox':
					entry[19] = "1";
					break;
				case 'maybeResponse':
					entry[20] = input;
					break;
				case 'MF0':
					entry[21] = "1";
					break;
				case 'MF1':
					entry[22] = "1";
					break;
				case 'MF2':
					entry[23] = "1";
					break;
				case 'MF3':
					entry[24] = "1";
					break;
				case 'MF4':
					entry[25] = "1";
					break;
				default:
					entry[0] = "ERROR IN THIS ENTRY"
			}
		}
	}

	entries.push(entry);
	return entries;
}

function createCSV(entries) {
	var csvContent = "data:text/csv;charset=utf-8,";
	var header = ["Persona", "Task", "Subgoal", "Action", "Question",
		"Yes", "Why", "Motiv", "Risk", "Tinker", "SE", "Info",
		"No", "Why", "Motiv", "Risk", "Tinker", "SE", "Info",
		"Maybe", "Why", "Motiv", "Risk", "Tinker", "SE", "Info"]
		
	csvContent += header.join(",") + "\n";
		
	entries.forEach(function(entry, index){
		var dataString = entry.join(",");
   		csvContent += index < entries.length ? dataString + "\n" : dataString;
	});
	
	return csvContent;
}

function downloadCSV(csvContent) {
	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
}

//Adds a series of questions (array of strings) to element
//Under each question, adds checkboxes for yes/no response and fields for explanation
function addQuestions(element, questions) {

	for (var i = 0; i < questions.length; i++) {
		var container = $("<div/>", { id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) });
		var yesFacets = $("<div/>", { id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "yesFacets" });
		var noFacets = $("<div/>", { id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "noFacets" });
		var maybeFacets =$("<div/>", { id: "S" + numSubtasks + "A" + numActions + "Q" + (i + 1) + "maybeFacets" });
		
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
		addFacetCheckboxes(yesFacets, i, "Y");
		yesFacets.appendTo(container);
		
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
		addFacetCheckboxes(noFacets, i, "N");
		noFacets.appendTo(container);
		
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
		addFacetCheckboxes(maybeFacets, i, "M");
		maybeFacets.appendTo(container);
			
		var screenShotButton = $("<button>", {
			class: "screenShot",
			html: "Click here, then show me the action"
		}).appendTo(container)
		
		container.appendTo(element);
	
	}	

}

$(document).ready(function() {
	
	//Reload previous html
	var prevHTML = localStorage.getItem("popupHTML");
	if (prevHTML != null) {
		$("body").html(prevHTML);
    	
    	//Restore global variables
    	personaName = localStorage.getItem("personaName");
    	pronoun = localStorage.getItem("pronoun");
    	possessive = localStorage.getItem("possessive");
    	numSubtasks = localStorage.getItem("numSubtasks");
    	numActions = localStorage.getItem("numActions");
    	personaShown = localStorage.getItem("personaShown");
    	
	} else {
		
		$("#viewPersona").hide();
	
		$("#getAction").children().hide();	
		$("#getTask").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getSubtask").children().fadeTo(0, 0.6).attr("disabled",  true);
	}
	
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
		$("#taskName").html(taskName);
		
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
		$(".screenShot").click(function() {
			callOverlay();
		});
	});
	
	//Show persona details
	$("#viewPersona").click(function() {
		if (personaShown == false) {
			personaShown = true;
			$(this).html("Hide " + personaName);
		} else {
			personaShown = false;
			$(this).html("Show " + personaName);
		}
		
		//Open persona view
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
	
	$("#saveAndExit").click(function() {
		$(document).each(function() {
			allInput = ($(this).find(':input'));
		});
		
		csv = createCSV(parseUserInput(allInput));
		downloadCSV(csv);
		
		//After save, don't save html on unload
		$(window).unbind("unload");
		localStorage.removeItem("popupHTML");
    	localStorage.removeItem("personaName");
    	localStorage.removeItem("pronoun");
    	localStorage.removeItem("possessive");
    	localStorage.removeItem("numSubtasks");
    	localStorage.removeItem("numActions");
    	localStorage.removeItem("personaShown");		
	});
	
});

// When user clicks off of tool or closes tool
$(window).unload(function () {
	
	var popup = chrome.extension.getViews({ type: 'popup' })[0];
	popupHTML = popup.document.body.innerHTML;
	
	//Save the current state (html) unless user is done (clicked done button)      
    localStorage.setItem("popupHTML", popupHTML);
    localStorage.setItem("personaName", personaName);
    localStorage.setItem("pronoun", pronoun);
    localStorage.setItem("possessive", possessive);
    localStorage.setItem("numSubtasks", numSubtasks);
    localStorage.setItem("numActions", numActions);
    localStorage.setItem("personaShown", personaShown);
});
