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
		canvas.style.cssText = "z-index:100; background:blue; width:100%; height:100%;";
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
