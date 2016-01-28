
//chrome.runtime.sendMessage({msg: "capture"}, function(response) {
 // console.log(response.dataUrl);
//});

/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request, 
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
			console.log("in script.js");
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.runtime.onMessage.addListener(handleRequest);

function main() {
	console.log("popup.js");
	alert("popup.js");
    var button = document.getElementById('button').value;
	console.log("button ", button)
    document.getElementById('hit').innerHTML = button;
}

var sidebarOpen = false;
function toggleSidebar() {
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
	/*	sidebar.innerHTML = "\
			<button onclick=\"myFunction()\"> Click Me </button>\
			";*/
		
		/*sidebar.innerHTML = "\
			<a  ref=\"www.google.com\">I'm a link</a>\
		";*/
			document.body.appendChild(sidebar);
			sidebarOpen = true;
		}

		//console.log("before if");
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
			/*
			console.log(elements);
			for(var element in elements){
				console.log(element.style.display);
				if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
					element.style.display = "default";
				}
			}
			*/
		
		//	genderMagCanvas.addEventListener('mousedown', mouseDown, false);
		//genderMagCanvas.addEventListener('mouseup', mouseUp, false);
		//genderMagCanvas.addEventListener('mousemove', mouseMove, false);
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
	//}
		init();
		console.log("At the end of toggle sidebar");
}

function testFunction () {
	console.log("In test function");
	var mySidebar = document.getElementById('mySidebar');
	mySidebar.innerHTML = "\
					<h1> Abby page </h1>\
					";	
}