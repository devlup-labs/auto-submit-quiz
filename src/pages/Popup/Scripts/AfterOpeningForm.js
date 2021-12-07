function AfterOpeningForm(link, starttime, endtime) {


    chrome.tabs.create({ url: link, active: true }, async (Tab) => {
        chrome.tabs.onActivated.addListener(MakeTimmer(starttime, endtime, link))
    });
    
}
function MakeTimmer(starttime, endtime, link) {
    // let [tab] =  chrome.tabs.query({ active: true, currentWindow: true });
    // chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     files: ["index11.js"],
    //   });
}


export { AfterOpeningForm };