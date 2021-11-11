import { printLine } from './modules/print';

console.log('Content mmmmmscript works!');
function AfterOpeningForm(link, starttime, endtime) {
    chrome.tabs.create({ url: link, active: true }, async (Tab) => {
        chrome.tabs.onActivated.addListener(MakeTimmer(starttime, endtime, link))
    });

}
function MakeTimmer(starttime, endtime, link) {
    chrome.tabs.query({ active: true, currentWindow: true }, function () {

    });

}
export { AfterOpeningForm };
