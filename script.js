/*Handle requests from background.html*/
console.log("in script.js");
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "toggleSidebar"){
		console.log("normal log");
		toggleSidebar();
		sendResponse({farewell: "Sidebar toggled"});
	}
	else if(request.greeting == "overlayScreen"){
		overlayScreen();
		sendResponse({farewell: "takeScreenShot"});
	}
  });

  
var sidebarOpen = false;
function toggleSidebar() {
	//chrome.extension.getBackgroundPage().console.log("toggle");
	console.log("In toggle sidebar")
		if(sidebarOpen) {
			console.log("closing sidebard")
			var el = document.getElementById('mySidebar');
			el.parentNode.removeChild(el);
			sidebarOpen = false;
		}
		else {
		console.log("in else statement")
		var sidebar = document.createElement('div');
		sidebar.id = "mySidebar";
			document.body.appendChild(sidebar);
			sidebarOpen = true;
	
			//<A HREF="#abbyBackground">Blue Words, Blue Words</A>
			//<A NAME="abbyBackground">
			var graphs = "<ul class=\"graph\">\
								<a href=\"#abbyMotivations\">Motivation</a>\
								<li class=\"facetMotivationAbby\">When Needed </li>\
								\
								<a href=\"#abbyMotivations\">Information Processing Styles</a>\
								<li class=\"facetProcessingAbby\">Selective </li>\
								\
								<a href=\"#abbyTechnology\">Computer Self-Efficacies</a>\
								<li class=\"facetSelfEffAbby\">Low Self-Efficacy &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp High Self-Efficacy</li>\
								\
								<a href=\"#abbyTechnology\">Attitudes towards Risk</a>\
								<li class=\"facetRiskAbby\">Risk-Averse &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Risk-Taking</li>\
								\
								<a href=\"#abbyTechnology\">Willingness to Tinker</a>\
								<li class=\"facetTinkerAbby\">Low Willingness &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp High Willingness</li>\
							</ul>"
			//sidebar.innerHTML = ;			
			var abbyBackgroundLink = document.createElement('a');
			abbyBackgroundLink.href = "#abbyBackground"
			var abbyBackgroundJump = document.createElement('a');
			abbyBackgroundJump.name = "abbyBackground";
			
			var abbyMotivationsJump = document.createElement('a');
			abbyMotivationsJump.name = "abbyMotivations"
			
			var abbyTechnologyJump = document.createElement('a');
			abbyTechnologyJump.name = "abbyTechnology";
			
			var persona = document.createElement('div');
			persona.id = "abbyPersona";
			var abbyHeader = document.createElement('h1');
			var abbyBackgroundH = document.createElement('h2');
			var abbyMotivationsH = document.createElement('h2');
			var abbyTechnologyH = document.createElement('h2');
			var abbyBackgroundP = document.createElement('p');
			var abbyMotivationsP = document.createElement('p');
			var abbyTechnologyP = document.createElement('p');
			var abbyGraphs = document.createElement('div');
				
				
				document.getElementById('mySidebar').appendChild(persona);
				
				document.getElementById('abbyPersona').appendChild(abbyHeader);
				//document.getElementById('abbyPersona').appendChild(abbyBackgroundLink);
				document.getElementById('abbyPersona').appendChild(abbyGraphs);
				
				document.getElementById('abbyPersona').appendChild(abbyBackgroundJump);
				document.getElementById('abbyPersona').appendChild(abbyBackgroundH);
				document.getElementById('abbyPersona').appendChild(abbyBackgroundP);
				
				document.getElementById('abbyPersona').appendChild(abbyMotivationsJump);
				document.getElementById('abbyPersona').appendChild(abbyMotivationsH);
				document.getElementById('abbyPersona').appendChild(abbyMotivationsP);

				document.getElementById('abbyPersona').appendChild(abbyTechnologyJump);
				document.getElementById('abbyPersona').appendChild(abbyTechnologyH);
				document.getElementById('abbyPersona').appendChild(abbyTechnologyP);
								
				
				abbyGraphs.innerHTML = graphs;
				abbyHeader.innerHTML = "Abby";
				abbyBackgroundH.innerHTML = "Background Knowledge and Skills";
				abbyBackgroundP.innerHTML = "Abby works as an accountant in a consulting firm. She just moved to this employer 1 week ago b , and their software systems are new to her. She describes herself as a numbers person c . She is not a professional programmer but she writes and edits spreadsheet formulas in her work. Abby has a degree in accounting, so she knows plenty of Math and knows how to think in terms of numbers c . She's never taken any computer programming or IT systems classes.Even though she's an accountant and deals with numbers all day at work, she enjoys working with numbers and logic c in her free time, too. She especially likes working puzzles, either on paper or on the computer, such as Sudoku and other puzzle games.";
				abbyMotivationsH.innerHTML =  "Motivations and Strategies";
				abbyMotivationsP.innerHTML = "Motivations : Abby is proficient with the technologies she uses. She learns new technologies when she needs to, but she doesn't spend her free time exploring technology or exploring obscure functionality of programs and devices that she uses. When Abby uses computers to problem-solve, she has little desire to learn new functions, or to search for information on them. She tries to use methods she is already familiar and comfortable with to achieve her goals. Information Processing Style : Abby leans towards a comprehensive information processing style when she needs to gather information to problem-solve. That is, before following any option that seems promising, she first gathers information comprehensively to try to form a complete understanding of the problem before trying to solve it. Thus, her style is burst-y; first she reads a lot, then she acts on it in a batch of activity.";
				abbyTechnologyH.innerHTML =  "Attitude Towards Technology";
				abbyTechnologyP.innerHTML = "Abby is generally comfortable using familiar technology, but she does not get a big kick out of obtaining the latest gadgets or learning how to use them f . She prefers to stay with the technologies for which she has already mastered the peculiarities, because of the following facets: Computer Self-Efficacy  : Abby has low computer self-efficacy, meaning that she has low self-confidence in performing computing tasks other than the ones she is familiar with. This has a variety of impacts on how she uses software. For example, she is not confident that she can learn to use new features and, as self-efficacy theory explains, she often gives up if she runs into challenges. Software with usability problems poses more challenges to her than it does to more confident users, and she often blames herself for problems that she encounters. Attitude toward Risk  : Abby is risk averse when she uses computers to perform tasks. When confronted with new software features, Abby worries that she will spend time on them and not get any benefits from doing so. She tries to perform tasks the safe (ie, familiar) way, even if the less familiar features might promise a more direct solution. Willingness to Explore and Tinker  : Abby doesn't particularly like tinkering with software (ie, just trying out new features or commands to see what they do) when she uses software in her work tasks. Instead, she prefers following step-by-step tutorials and wizards. (However, when she does tinker, it has positive effects on her understanding of the software.) When software features/commands cause problems for her, she tends to blame herself and, if she can, she then just avoids those troublesome features/commands. She then uses work-arounds that involve using only features/commands she is familiar with already.";
			
			}

		if(!document.getElementById('genderMagCanvasContainer')){
			//console.log("In toggle sidebar");
			var canvasContainer = document.createElement('div');
			// Add the div into the document
		}
		else{
			var canvasContainer = document.getElementById('genderMagCanvas');	
		}
	
		canvasContainer.id = "genderMagCanvasContainer";
		canvasContainer.style.position="fixed";
		// Set to 100% so that it will have the dimensions of the document
		canvasContainer.style.left="0px";
		canvasContainer.style.top="0px";
		canvasContainer.style.width="100%";
		canvasContainer.style.height="100%";
		canvasContainer.style.zIndex="1000";
		document.body.appendChild(canvasContainer);
		
		var canvas = document.createElement('canvas');
		canvas.style.width = canvasContainer.scrollWidth+"px";
		canvas.style.height = canvasContainer.scrollHeight+"px";
		canvas.id = "genderMagCanvas";
		canvas.position = "fixed";
		canvas.style.cssText = "z-index:100; background:red; width:100%; height:100%;";
		canvas.style.opacity = .50;
		canvas.width=canvasContainer.scrollWidth;
		canvas.height=canvasContainer.scrollHeight;
		canvas.style.overflow = 'visible';
		canvas.style.position = 'fixed';
		canvasContainer.appendChild(canvas);


		var genderMagCanvas = document.getElementById('genderMagCanvas'),
			ctx = genderMagCanvas.getContext('2d'),
			rect = {},
			drag = false;
		
	
		function init() {
			genderMagCanvas.addEventListener('mousedown', mouseDown, false);
			genderMagCanvas.addEventListener('mouseup', mouseUp, false);
			genderMagCanvas.addEventListener('mousemove', mouseMove, false);			
		}
		function mouseDown(e) {
			rect.startX = e.pageX - this.offsetLeft;
			rect.startY = e.pageY - this.offsetTop;
			drag = true;
		}			
		function mouseUp(e) {
			drag = false;
			console.log(rect);
			elm = document.elementFromPoint(rect.startX, rect.startY);
			var elements = new Array();
			while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" )
			{
				elements.push(elm);
				elm.style.display = "none";
				elm = document.elementFromPoint(rect.startX, rect.startY);
			}
			console.log(elm);
			
			console.log(elements);
			for(var element in elements){
				if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
					element.style.display = "default";
				}
			}
		}
		function mouseMove(e) {
			if (drag) {
				rect.w = (e.pageX - this.offsetLeft) - rect.startX;
				rect.h = (e.pageY - this.offsetTop) - rect.startY ;
				ctx.clearRect(0,0,canvas.width,canvas.height);
				draw();
			}
		}
		function draw() {
			ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
		}
		init();
		
		console.log("At the end of toggle sidebar");
}
function overlayScreen(){
	if(!document.getElementById('genderMagCanvasContainer')){
		console.log("In overlayScreen");
		var canvasContainer = document.createElement('div');
			// Add the div into the document
	}
	else{
		var canvasContainer = document.getElementById('genderMagCanvas');	
	}
	
		canvasContainer.id = "genderMagCanvasContainer";
		canvasContainer.style.position="fixed";
		// Set to 100% so that it will have the dimensions of the document
		canvasContainer.style.left="0px";
		canvasContainer.style.top="0px";
		canvasContainer.style.width="100%";
		canvasContainer.style.height="100%";
		canvasContainer.style.zIndex="1000";
		document.body.appendChild(canvasContainer);
		
		var canvas = document.createElement('canvas');
		canvas.style.width = canvasContainer.scrollWidth+"px";
		canvas.style.height = canvasContainer.scrollHeight+"px";
		canvas.id = "genderMagCanvas";
		canvas.position = "fixed";
		canvas.style.cssText = "z-index:100; background:red; width:100%; height:100%;";
		canvas.style.opacity = .50;
		canvas.width=canvasContainer.scrollWidth;
		canvas.height=canvasContainer.scrollHeight;
		canvas.style.overflow = 'visible';
		canvas.style.position = 'fixed';
		canvasContainer.appendChild(canvas);


		var genderMagCanvas = document.getElementById('genderMagCanvas'),
			ctx = genderMagCanvas.getContext('2d'),
			rect = {},
			drag = false;
		
	
		function init() {
			genderMagCanvas.addEventListener('mousedown', mouseDown, false);
			genderMagCanvas.addEventListener('mouseup', mouseUp, false);
			genderMagCanvas.addEventListener('mousemove', mouseMove, false);			
		}
		function mouseDown(e) {
			rect.startX = e.pageX - this.offsetLeft;
			rect.startY = e.pageY - this.offsetTop;
			drag = true;
		}			
		function mouseUp(e) {
			drag = false;
			console.log(rect);
			elm = document.elementFromPoint(rect.startX, rect.startY);
			var elements = new Array();
			while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" )
			{
				elements.push(elm);
				elm.style.display = "none";
				elm = document.elementFromPoint(rect.startX, rect.startY);
			}
			console.log(elm);
			var highlightClick = document.createElement("div");
			highlightClick.id = "highlightClick";
			document.body.appendChild(highlightClick);
			highlightClick.style.left = rect.startX-40 + "px";
			highlightClick.style.top = rect.startY-20 + "px";
			console.log("Clicked ", highlightClick)
			
		
			console.log(elements);
			for(var element in elements){
				console.log(element.style.display);
				if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
					element.style.display = "default";
				}
			}
		}
		function mouseMove(e) {
			if (drag) {
				rect.w = (e.pageX - this.offsetLeft) - rect.startX;
				rect.h = (e.pageY - this.offsetTop) - rect.startY ;
				ctx.clearRect(0,0,canvas.width,canvas.height);
				draw();
			}
		}
		function draw() {
			ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
		}
		init();
		
}