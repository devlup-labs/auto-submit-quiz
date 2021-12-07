
let flink = "https://docs.google.com/forms/"
let start_time=""
let end_time=""
let throughextension=false
chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({ flink });
    chrome.storage.sync.set({ start_time });
    chrome.storage.sync.set({ throughextension });
    chrome.storage.sync.set({ end_time });

    console.log("defaul values set");
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(tab.url.includes("https://docs.google.com/forms/") && changeInfo.status==='complete' ){
    //     let [tab] =  chrome.tabs.query({ active: true, currentWindow: true });
    // chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     files: ['src\pages\Content\index.js.js'],
    //   });
    }
});





    
