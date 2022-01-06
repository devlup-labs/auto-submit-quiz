import { v4 as uuidv4 } from 'uuid';

let flink = 'https://docs.google.com/forms/';
let start_time = '';
let end_time = '';
let throughextension = false;

let AutoSumitButton = false;
let AutoFinalValuesAdded = false;
let AlarmNameToBeDisplayed = '';
let SubmitClicked = false;
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flink });
  chrome.storage.sync.set({ start_time });
  chrome.storage.sync.set({ throughextension });
  chrome.storage.sync.set({ end_time });
  chrome.storage.sync.set({ AutoSumitButton });
  chrome.storage.sync.set({ AutoFinalValuesAdded });
  chrome.storage.sync.set({ AlarmNameToBeDisplayed });
  chrome.storage.sync.set({ SubmitClicked });

  console.log('defaul values set');
});

function CreateUniqueAlarmId() {
  return uuidv4();
}

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

var link2 = '';
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.AutoFinalValuesAdded?.newValue) {
    chrome.storage.sync.set({ AutoFinalValuesAdded: false });
    console.log('enable debug mode?');
    chrome.storage.sync.get('flink', function (items) {
      console.log(items.flink);
      link2 = items.flink;
      chrome.tabs.create({ url: link2, active: true });
    });
    console.log(link2);
    console.log('2worked');
  }
});
