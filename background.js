
    function hello(){
        chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
            console.log("in background.js");
            chrome.tabs.insertHTML(tabs[0].id, {file: "helloWorld.html"});
        });
    }
    