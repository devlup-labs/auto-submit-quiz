let formLink = 'https://docs.google.com/forms/';
var alarmTime;
let startTime = '';
let endTime = '';
let throughExtension = false;
let DiffBtwStartAndCurrent = 0;
let AutoSumitButton = false;
let AutoFinalValuesAdded = false;

const onAlarm = async (alarm) => {
  chrome.tabs.create({ url: link, active: true });
};

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.DiffBtwStartAndCurrent?.newValue) {
    chrome.storage.sync.get('formLink', (items) => {
      formLink = items.formLink;
    });

    chrome.storage.sync.get('DiffBtwStartAndCurrent', (items) => {
      alarmTime = Date.now() + items.DiffBtwStartAndCurrent;
      chrome.alarms.create('Open the form', {
        when: alarmTime,
        periodInMinutes: null,
      });
      console.log(`Alarm at: ${alarmTime}, link: ${formLink}`);
      chrome.alarms.onAlarm.addListener(onAlarm);
    });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.AutoFinalValuesAdded?.newValue) {
    chrome.storage.sync.set({ AutoFinalValuesAdded: false });
    chrome.storage.sync.get('formLink', (items) => {
      chrome.tabs.create({ url: items.formLink, active: true });
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ formLink });
  chrome.storage.sync.set({ startTime });
  chrome.storage.sync.set({ throughExtension });
  chrome.storage.sync.set({ endTime });
  chrome.storage.sync.set({ DiffBtwStartAndCurrent });
  chrome.storage.sync.set({ AutoSumitButton });
  chrome.storage.sync.set({ AutoFinalValuesAdded });

  console.log('Default values set\n');
});
