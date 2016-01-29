function updateHTML(){
		chrome.extension.getBackgroundPage().console.log("testing");
		document.getElementById('button2').innerHTML = "abby";
}


document.getElementById('button2').addEventListener('click', updateHTML);