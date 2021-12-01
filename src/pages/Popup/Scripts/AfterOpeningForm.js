function AfterOpeningForm(link, starttime, endtime) {
    chrome.tabs.create({ url: link, active: true }, async (Tab) => {
        chrome.tabs.onActivated.addListener(MakeTimmer(starttime, endtime, link))
    });

}
function MakeTimmer(starttime, endtime, link) {
    return starttime 
}


export { AfterOpeningForm ,MakeTimmer};