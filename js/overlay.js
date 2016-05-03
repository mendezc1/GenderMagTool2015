function overlayScreen(){
	if(!document.getElementById('genderMagCanvasContainer')){
		console.log("In overlayScreen");
		// Add the div into the document
		var canvasContainer = document.createElement('div');
		canvasContainer.id = "genderMagCanvasContainer";
		document.body.appendChild(canvasContainer);	
	}
	else{
		console.log("in else");
		document.getElementById('genderMagCanvasContainer').remove();	
		var canvasContainer = document.createElement('div');
		canvasContainer.id = "genderMagCanvasContainer";
		document.body.appendChild(canvasContainer);	
	}
	if(!document.getElementById("genderMagCanvas")){
		var canvas = document.createElement('canvas');
		canvas.id = "genderMagCanvas";
		canvas.style.width = canvasContainer.scrollWidth+"px";
		canvas.style.height = canvasContainer.scrollHeight+"px";
		canvas.width=canvasContainer.scrollWidth;
		canvas.height=canvasContainer.scrollHeight;
		canvasContainer.appendChild(canvas);
	}

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
			console.log("element" ,elm.offsetHeight, elm.offsetWidth, elm.offsetLeft, elm.offsetTop);
			var highlightClick = document.createElement("div");
			highlightClick.id = "highlightClick";
			document.body.appendChild(highlightClick);
			highlightClick.style.height = elm.offsetHeight + "px";
			highlightClick.style.width = elm.offsetWidth + "px";
			highlightClick.style.left = elm.offsetLeft + "px";
			highlightClick.style.top = elm.offsetTop + "px";
			console.log("Clicked ", highlightClick)
			
		
			console.log(elements);
			for(var element in elements){
				if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
					element.style.display = "default";
				}
			}
		chrome.runtime.sendMessage({greeting: "takeScreenShot", userAction: elm.innerText}, function(response) {
				
		});
		console.log("sending message");
		setTimeout(function(){
			document.getElementById("highlightClick").remove();
		}, 2000);
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
