var personaName = "";
var pronoun = "";
var possessive = "";
var numScreenShots = 0;
var numSubtasks = 0;
var personaShown = 0; //toggle when user clicks view/hide persona button
var screenShotURL;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "takeScreenShot"){
		takeScreenShot();
		//chrome.extension.getBackgroundPage().console.log("message url ",screenShotURL);
		sendResponse({farewell: screenShotURL});}
});

$(document).ready(function() {
	
	//Reload previous html
	var prevHTML = localStorage.getItem("popupHTML");	
	if (prevHTML != null) {
	
		//Reset html
		$("body").html(prevHTML);
	
		//Restore user input (state before they clicked away from popup)
		/*$(document).each(function() {
			allInput = ($(this).find(':input'));
		});
	
		for (var i = 0; i < allInput.length; i++) {
			var id = allInput[i]["id"];
			var type = allInput[i]["type"]
		
			var value = localStorage.getItem(id);
			
			if (type == "checkbox") {
				$("#" + id).attr("checked", $.parseJSON(value)); //convert string to bool
			} else if (type != "submit") {
				$("#" + id).val(value);
			}
		}*/
    	
    	//Restore global variables
    	personaName = localStorage.getItem("personaName");
    	pronoun = localStorage.getItem("pronoun");
    	possessive = localStorage.getItem("possessive");
    	numSubtasks = localStorage.getItem("numSubtasks");
		numScreenShots = localStorage.getItem("numScreenShots");
    	
	} else {
		
		$(".setup").hide();
		$("#viewPersona").hide();
		
		$("#getPersona").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getTask").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getSubtask").children().fadeTo(0, 0.6).attr("disabled",  true);
		
		$("#subtaskPrompt").hide();
	}
	
	//Accordion menu
    $(function() {
    	$(".accordion").accordion({ heightStyle: "content", collapsible: true });
  	});
	
	//Get team name
	$("#submitTeam").click(function() {
		var teamName = $("#teamInput").val();
		
		$("#teamName").fadeIn(800);
		$("#teamName").html("Team: "+ teamName);
		
		$("#getTeam").children().hide();
		$("#getPersona").children().fadeTo(500, 1).attr("disabled",  false);
		
	});
	
	//Get persona name
	$("#submitPersona").click(function() {
		personaName = $("#personaSelection").val();
		
		$("#personaName").fadeIn(800);
		$("#personaName").html("Persona: " + personaName + "<br>");
		
		if ((personaName == "Tim") || (personaName == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		
		$("#getPersona").children().remove();
		$("#getPersona").remove();
		
		//Scenario prompt
		$("#getTask").children().fadeTo(500, 1).attr("disabled", false);
		$("#taskPrompt").html("Take a moment to describe the scenario " + personaName + " will be performing");
		
		//Show button to view persona
		$("#viewPersona").show().html("Show " + personaName);
		personaShown = true;
	});
	
	//Get task name
	$('#submitTask').click(function() {
		var taskName = $("#taskInput").val();
		
		$("#taskName").fadeIn(800);
		$("#taskName").html("Scenario: " + taskName);
		
		$("#getTask").children().remove();
		$("#getTask").remove();
		
		$("#beginSetup").fadeOut(800, function () { $(this).remove(); });

		//Show subtask prompt
		$("#getSubtask").children().fadeTo(500, 1).attr("disabled",  false);		
		$("#subtaskPrompt").show()
		$("#subtaskPrompt").html("Now that you've completed the initial setup, enter a subgoal for " + personaName + " to perform");
	});
	
	//Get Subtask
	$("#submitSubtask").click(function() {
		numSubtasks++;
			
		//Clear the hint in the field for subtask name/description
		$("#subtaskInput").attr("placeholder", "");

		//Add subgoal
		$.get("templates/subgoal.html", function(html) {
			$("#subtasks").append(html);
			$(".accordion").accordion({ heightStyle: "content", collapsible: true });
			$(".accordion").accordion("refresh");
		});			    	
		
		//Reset subtask form
		$("#subtaskInput").val("");
		$("#subtaskPrompt").html("Are there any more subgoals in this scenario?");
		$("#submitSubtask").val("Add New Subgoal");
		
	});
	
	//Add ideal action
	$("body").on("click", "input.addAction", function() {
		//the ideal action container of the current subgoal
		var idealActions = $(this).parent().children("#idealActions");
		
		$.get("templates/action.html", function(html) {
			console.log("Here");
			idealActions.append(html);
			$(".accordion").accordion("refresh");
		});
	});
	
	//Show persona details
	$("#viewPersona").click(function() {
		if (personaShown == true) {
			personaShown = false;
			$(this).html("Hide " + personaName);
		} else {
			personaShown = true;
			$(this).html("Show " + personaName);
		}
		
		//Open persona view
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSidebar", selection: personaName}, function(response) {
				chrome.extension.getBackgroundPage().console.log("resp ", response);
			});
		});
	});
	
	$("body").on("click", "button.removeSubtask", function() {
		var id = event.target.id;
		var subtaskNumber = id[id.length - 1];
				
		$("#S" + subtaskNumber).remove();
		$("#S" + subtaskNumber + "Name").remove();
		
		numSubtasks--;
		$(".accordion").accordion("refresh");
	});
	
	$("body").on("click", "button.removeAction", function() {
		var id = event.target.id;
		var subtaskNumber = id[7];
		var actionNumber = id[9];
				
		$("#S" + subtaskNumber + "A" + actionNumber).remove();
		
		//Reduce the action count for the subgoal
		//prevNumActions = $("#S" + subtaskNumber).attr("numactions");
		//curNumActions = parseInt(prevNumActions) - 1;
		//$("#S" + subtaskNumber).attr("numactions", curNumActions);
		
		$(".accordion").accordion("refresh");
	});
	$("body").on("click", "button.screenShot", function(){
		callOverlay();
	});
	
	$("#saveAndExit").click(function() {
		$(document).each(function() {
			allInput = ($(this).find(':input'));
		});
		
		csv = createCSV(parseUserInput(allInput));
		downloadCSV(csv);
		
		//After save, don't store html on unload
		$(window).unbind("unload");
		
		//Remove input and global variables
		localStorage.clear();		
	});
	
});

// When user clicks off of tool or closes tool
$(window).unload(function () {
	
	var popup = chrome.extension.getViews({ type: 'popup' })[0];
	popupHTML = popup.document.body.innerHTML;
	
	$(document).each(function() {
		allInput = ($(this).find(':input'));
	});
	
	for (var i = 0; i < allInput.length; i++) {
		var id = allInput[i]["id"];
		var type = allInput[i]["type"]
		var checked = allInput[i]["checked"]
		var value = allInput[i]["value"]
		
		//Save the values of checkboxes and text areas (all input besides buttons)
		if (type == "checkbox") {
			localStorage.setItem(id, checked);
		} else if (type != "button") {
			localStorage.setItem(id, value);
		}
	}
	
	//Save the current state (html) unless user is done (clicked done button)      
    localStorage.setItem("popupHTML", popupHTML);
    localStorage.setItem("personaName", personaName);
    localStorage.setItem("pronoun", pronoun);
    localStorage.setItem("possessive", possessive);
    localStorage.setItem("numSubtasks", numSubtasks);
	localStorage.setItem("numScreenShots", numScreenShots);
    //localStorage.setItem("personaShown", personaShown);
	
});
