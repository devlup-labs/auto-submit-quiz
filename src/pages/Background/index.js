console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(tab.url.includes("https://docs.google.com/forms/") && changeInfo.status==='complete' ){
        console.log("form is opened before executing script");
    }
});





    
