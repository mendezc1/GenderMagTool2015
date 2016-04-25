var numScreenShots = 0;
var numSubgoals = 0;

var personaShown = false; //toggle when the user clicks the Show/Hide Persona button
var screenShotURL;

$(document).ready(function() {
	
	//if the user has opened the tool, reload previous html...
	var prevHTML = localStorage.getItem("popupHTML");
		
	if (prevHTML) {
		//reload previous html
		$("body").html(prevHTML);
	
		//restore input fields
		$(document).each(function() {
			var input = ($(this).find(':input'));
			
			for (var i = 0; i < input.length; i++) {
				var id = input[i]["id"];
				var type = input[i]["type"]
				var value = localStorage.getItem(id);
			
				if (type == "checkbox") {
					value = $.parseJSON(value); //convert string to bool
					$("#" + id).attr("checked", value);
				} else if (type != "submit") {
					$("#" + id).val(value);
				}
			}
		});
		
    	
    	//restore global variables
    	personaName = localStorage.getItem("personaName");
    	pronoun = localStorage.getItem("pronoun");
    	possessive = localStorage.getItem("possessive");
    	numSubgoals = localStorage.getItem("numSubgoals");
		numScreenShots = localStorage.getItem("numScreenShots");
    	
	} else {
		
		//initial state
		$(".setup").hide();
		$("#viewPersona").hide();
		
		$("#icons").children().fadeTo(0, 0.3)
		$("#getPersona").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getScenario").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getSubgoal").children().fadeTo(0, 0.6).attr("disabled",  true);
		
		$("#subgoalPrompt").hide();
	}
	
	//initialize the subgoal accordion menu
    $(function() {
    	$(".accordion").accordion({ heightStyle: "content", collapsible: true });
  	});
	
	
	//set team name
	$("#submitTeam").click(function() {
		var teamName = $("#teamInput").val();
		
		$("#team").fadeTo(800, 1)
		$("#teamName").html(teamName);
		
		//Show persona selector
		$("#getTeam").children().hide();
		$("#getPersona").children().fadeTo(500, 1).attr("disabled",  false);
		
	});
	
	
	//set persona name
	$("#submitPersona").click(function() {
		var personaName = $("#personaSelection").val();
		
		$("#persona").fadeTo(800, 1)
		$("#personaName").html(personaName);
		
		if ((personaName == "Tim") || (personaName == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		
		//remove persona selector
		$("#getPersona").children().remove();
		$("#getPersona").remove();
		
		//show scenario prompt
		$("#getScenario").children().fadeTo(500, 1).attr("disabled", false);
		$("#scenarioPrompt").html("Take a moment to describe the scenario " + personaName + " will be performing");
		
		//show button to view persona
		$("#viewPersona").show().html("Show " + personaName);
		personaShown = false;
	});
	
	
	//set scenario name
	$('#submitScenario').click(function() {
		var personaName = $("#personaName").html();
		var scenario = $("#scenarioInput").val();
		
		$("#scenario").fadeTo(800, 1)
		$("#scenarioName").html(scenario);
		
		$("#getScenario").children().remove();
		$("#getScenario").remove();
		
		$("#setup").html("Now that you've completed the initial setup, enter a Subgoal for " + personaName + " to perform");

		//show subgoal prompt
		$("#getSubgoal").children().fadeTo(500, 1).attr("disabled",  false);
		$("#subgoalPrompt").show()
	});
	
	
	//add subgoal
	$("#submitSubgoal").click(function() {
		numSubgoals++;
			
		var subgoalName = $("#subgoalInput").val();
		
		//remove setup instructions, change subgoal prompt
		$("#setup").fadeOut(800, function () { $(this).remove(); });

		//Add subgoal
		$.get("templates/subgoal.html", function(html) {
			$("#subgoals").append(html);
			
			//each subtask in the menu has two elements, a header and a content div
			
			var subgoals = $("#subgoals").children();
			var subgoalIndex = subgoals.length - 1
			
			//header and content of this subtask
			var content = subgoals[subgoalIndex];
			var header = subgoals[subgoalIndex - 1];
			
			$(content).attr("id", "S" + numSubgoals);
			$(header).attr("id", "S" + numSubgoals + "Name");
			$(header).html(subgoalName);

			
			//prepend subgoal number to id of content elements
			$(content).children().each(function(index) {
				var id = $(this).attr("id");
				if (id) {
					$(this).attr("id", "S" + numSubgoals + id);
				}
			})
			
			//initialize the ideal action accordion menu imbedded in the subgoal
			$(".accordion").accordion({ heightStyle: "content", collapsible: true });
			$(".accordion").accordion("refresh");
		});			    	
		
		//reset subtask form
		$("#subgoalInput").val("");
		$("#subgoalPrompt").html("Are there any more subgoals in this scenario?");
		$("#submitSubgoal").val("Add New Subgoal");
		
	});
	
	
	//Add ideal action
	$("body").on("click", "input.addAction", function() {
		var subgoal = $(this).parent();
		var subgoalId = subgoal.attr("id");
		
		var actionName = subgoal.children(".actionName").val();
		
		$.get("templates/action.html", function(html) {
			subgoal.children(".idealActions").append(html);
			$(".accordion").accordion("refresh");
			
			//increment the number of actions associated with the current subgoal
			var numActions = parseInt(subgoal.attr("data-numactions"));
			numActions = numActions + 1;
			subgoal.attr("data-numactions", numActions);
							
			var idealActions = subgoal.children(".idealActions").children();
			var actionIndex = idealActions.length - 1;

			//header and content of this action
			var content = idealActions[actionIndex];
			var header = idealActions[actionIndex - 1];
			
			$(content).attr("id", subgoalId + "A" + numActions);
			$(header).attr("id", subgoalId + "A" + numActions + "Name");
			$(header).html(actionName);
			
			//prepend subgoal number and action number to id of content elements
			$(content).children().each(function(index) {
				var id = $(this).attr("id");
				if (id) {
					$(this).attr("id", subgoalId + "A" + numActions + id);
				}	
			})
			
			$(content).children().attr("disabled", true);
			$(content).find(".removeAction").attr("disabled", false);
		});
		
		//reset form
		$(".actionName").val("");
		
	});
	
	
	//remove subgoal
	$("body").on("click", "input.removeSubgoal", function() {
		var id = event.target.id;
		var subgoalNumber = id[1];
				
		$("#S" + subgoalNumber).remove();
		$("#S" + subgoalNumber + "Name").remove();
		
		$(".accordion").accordion("refresh");
	});
	
	
	//remove action
	$("body").on("click", "input.removeAction", function() {
		var id = event.target.id;
		var subgoalNumber = id[1];
		var actionNumber = id[3];
				
		$("#S" + subgoalNumber + "A" + actionNumber).remove();
		$("#S" + subgoalNumber + "A" + actionNumber + "Name").remove();

		$(".accordion").accordion("refresh");
	});
	
	
	
	//overlay for capturing ideal action
	$("body").on("click", "button.overlayTrigger", function(){
		
		//enable the input fields for the current subgoal
		$(this).parent().parent().children().removeAttr("disabled");
		
		$(this).html("Recapture This Action");
		$(this).prev().html(
			"Got it! Now you can move on to the next question. " +
			"You can also redo your screen capture by clicking the button again."
		);
		
		callOverlay();
	});
	
	
	$("#saveAndExit").click(function() {
		$(document).each(function() {
			var input = ($(this).find(':input'));
			
			csv = createCSV(parseUserInput(input));
			downloadCSV(csv);
		
			//after save, don't store html on unload
			$(window).unbind("unload");
		
			//remove input and global variables
			localStorage.clear();
		});		
	});
	
	
	//show and hide persona view
	$("#viewPersona").click(function() {
		var personaName = $("#personaName").html();
		if (personaShown == true) {
			personaShown = false;
			$(this).html("Hide " + personaName);
		} else {
			personaShown = true;
			$(this).html("Show " + personaName);
		}

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "togglePersona", selection: personaName}, function(response) {
				chrome.extension.getBackgroundPage().console.log("resp ", response);
			});
		});
	});
});





//when user clicks off of tool
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
		
		//save the values of checkboxes and text areas (all input besides buttons)
		if (type == "checkbox") {
			localStorage.setItem(id, checked);
		} else if (type != "button") {
			localStorage.setItem(id, value);
		}
	}
	
	//save the current state (html) unless user is done (clicked done button)      
    localStorage.setItem("popupHTML", popupHTML);
    localStorage.setItem("personaName", personaName);
    localStorage.setItem("pronoun", pronoun);
    localStorage.setItem("possessive", possessive);
    localStorage.setItem("numSubgoals", numSubgoals);
	localStorage.setItem("numScreenShots", numScreenShots);
	
});
