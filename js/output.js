function parseUserInput(userInput) {
	var scenario = $("#scenarioName").html();
	var team = $("#teamName").html();
	var persona = $("#personaName").html();
	
	//for each question, three possible responses (yes, no, or maybe)
	//plus one checkbox for each of the five facets
	var inputsPerResponse = 3 + 5;

	var entry = []; //corresponds to a single row in the csv
	var entries = [];
		
	lastSubgoal = null;
	lastQuestion = null;
	
	for (var i = 0; i < userInput.length; i++) { 
		if ((userInput[i]["checked"] == true) || (userInput[i]["type"] == "textarea")) {
			    
			var responseId = userInput[i]['id'];
			var input = userInput[i]['value'];
				
			//every input field is identified by a string in the format:
			//S<subgoal#>A<action#>Q<question#><variable_length_string>
			var subgoalNumber = responseId[1];
			var actionNumber = responseId[3];
			var questionNumber = responseId[5];
				
			//if on the same question for the same subgoal, update current entry
			//if new question, add entry to list of entries and start on a new entry
			if ((questionNumber != lastQuestion) || (subgoalNumber != lastSubgoal)) {
				if (entry.length != 0) {
					entries.push(entry);
				}
					
				var subgoalName = $("#S" + subgoalNumber + "Name").text();
				var actionName = $("#S" + subgoalNumber + "A" + actionNumber + "Name").html();
				
				var date = today();
				var time = now();
				
				entry = [date, time, team, persona, scenario, subgoalName, actionName, questionNumber];
				prefix = entry.length - 1;
					
				//init fields containing user input with default value
				for (var j = 0; j < inputsPerResponse; j++) {
					entry.push("0");
				}
					
				//update
				lastSubgoal = subgoalNumber;
				lastQuestion = questionNumber;
			}

			var inputId = responseId.substring(6); //the variable length string at the end of the id
			switch(inputId) {
				case 'whyYes':
					entry[prefix + 1] = input;
					break;
				case 'whyNo':
					entry[prefix + 2] = input;
					break;
				case 'whyMaybe':
					entry[prefix + 3] = input;
					break;
				case 'motiv':
					entry[prefix + 4] = "1";
					break;
				case 'info':
					entry[prefix + 5] = "1";
					break;
				case 'self':
					entry[prefix + 6] = "1";
					break;
				case 'risk':
					entry[prefix + 7] = "1";
					break;
				case 'tinker':
					entry[prefix + 8] = "1";
					break;
				default:
					entry[0] = "ERROR IN THIS ENTRY"
			}
		}
	}

	//add the last entry
	entries.push(entry);
	
	return entries;
}

function createCSV(entries) {
	var csvContent = "data:text/csv;charset=utf-8,";
	
	var header = ["Date", "Time", "Team", "Persona", "Scenario", "Subgoal", "Action", "Question",
		"Yes", "No", "Maybe", "Motivation", "Info Processing", "Self-Efficacy", "Risk", "Tinker"]
		
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