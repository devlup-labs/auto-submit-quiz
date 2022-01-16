let flink = 'https://docs.google.com/forms/';
let start_time = '';
let end_time = '';
let throughextension = false;
let AutoSumitButton = false;
let SubmitClicked = false;
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flink });
  chrome.storage.sync.set({ start_time });
  chrome.storage.sync.set({ throughextension });
  chrome.storage.sync.set({ end_time });
  chrome.storage.sync.set({ AutoSumitButton });
  chrome.storage.sync.set({ SubmitClicked });

  console.log('defaul values set');
});

async function onAlarm(alarm) {
  chrome.storage.sync.set({ throughextension: true });
  console.log('i will work for sure');
  chrome.tabs.create({ url: link, active: true });
}

var link = '';
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.SubmitClicked?.newValue) {
    chrome.storage.sync.get('SubmitClicked', function (items) {
      if (items.SubmitClicked) {
        chrome.storage.sync.get('flink', function (items) {
          link = items.flink;
          chrome.storage.sync.set({ SubmitClicked: false });
          chrome.alarms.onAlarm.addListener(onAlarm);
        });

        return;
      }
    });
  }
});
// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('message recieved');
  if (request.greeting === 'Open the form will you?') {
    chrome.storage.sync.get('flink', function (items) {
      var link = items.flink;
      chrome.tabs.create({ url: link, active: true });
    });

    sendResponse({ farewell: 'opening Form' });
  }
});
// async function gettabinfo() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab.active;
// }
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('message recieved');
//   if (request.greeting === 'check the tab is active?') {
//     let x = gettabinfo();
//     if (x === true) {
//       sendResponse({ farewell: 'tab is active' });
//     } else {
//       sendResponse({ farewell: 'tab is not active' });
//     }
//   }
// });
