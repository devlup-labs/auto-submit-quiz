import {
  getAllDataFromStorage,
  getDataFromStorage,
  removeDataFromStorage,
} from '../Popup/scripts/storage.js';
import { createTab } from '../Popup/scripts/utils.js';

// var link = '';
// chrome.storage.onChanged.addListener((changes, area) => {
//   if (area === 'sync' && changes.submitClicked?.newValue) {
//     chrome.storage.sync.get('submitClicked', function (items) {
//       if (items.submitClicked) {
//         chrome.storage.sync.get('flink', function (items) {
//           link = items.flink;
//           chrome.storage.sync.set({ submitClicked: false });
//           chrome.alarms.onAlarm.addListener(onAlarm);
//         });

//         return;
//       }
//     });
//   }
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('message recieved');
//   if (request.greeting === 'Open the form will you?') {
//     chrome.storage.sync.get('flink', function (items) {
//       var link = items.flink;
//       chrome.tabs.create({ url: link, active: true });
//     });

//     sendResponse({ farewell: 'opening Form' });
//   }
// });

const onAlarm = async (alarm) => {
  let data = await getDataFromStorage(alarm.name);
  var currentTime = new Date().getTime();
  let endTime = data.endTime;
  let details = await getDataFromStorage('currentAlarmData');
  details['formLink'] = data.formLink;
  details['startTime'] = data.startTime;
  details['endTime'] = data.endTime;
  details['openedThroughExtension'] = true;
  chrome.storage.sync.set({ currentAlarmData: details });
  if (currentTime - data.startTime < 5000) {
    createTab(data.formLink, endTime);
  } else {
  }
  removeDataFromStorage(alarm.name);
};

const receiveMessage = async (request, sender, sendresponse) => {
  sendresponse({ status: true });
  console.log(`message::key=${request.key}`);
  if (!sender.tab) {
    if (request.type == 'REMOVE_ALARM') {
      // remove alarm
      await new Promise((resolve) => chrome.alarms.clear(request.key, resolve));
      removeDataFromStorage(request.key);
      // remove data from storage
    } else if (request.type == 'REMOVE_ALL_ALARM') {
      // clear all alarm
      await new Promise((resolve) => chrome.alarms.clearAll(resolve));
      // clear all storage
      await new Promise((resolve) => chrome.storage.sync.clear(resolve));
    } else {
      console.log('Message from popup.js');
      console.log(request);
    }
  } else {
    console.log('Message from tab');
  }
};

const onStart = async () => {
  let data = await getAllDataFromStorage();
  // Remove all alarms that are not in the storage
  let alarms = await new Promise((resolve) => chrome.alarms.getAll(resolve));
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].name in data) {
      continue;
    } else {
      await new Promise((resolve) =>
        chrome.alarms.clear(alarms[i].name, resolve)
      );
    }
  }

  // Set alarms that are in storage but not yet scheduled
  for (var key in data) {
    let alarm = await new Promise((resolve) => chrome.alarms.get(key, resolve));
    if (alarm == undefined) {
      chrome.alarms.create(key, {
        when: data[key].time,
        periodInMinutes: null,
      });
    }
  }

  var values = {
    formLink: '',
    startTime: '',
    endTime: '',
    openedThroughExtension: false,
    autoSumitButton: false,
    submitClicked: false,
  };
  let details = await getDataFromStorage('currentAlarmData');
  if (!details) {
    chrome.storage.sync.set({ currentAlarmData: values });
  }
};

const onInstallation = async () => {
  onStart();
};

// on install
chrome.runtime.onInstalled.addListener(onInstallation);

// on startup
chrome.runtime.onStartup.addListener(onStart);

// on alarm event listner
chrome.alarms.onAlarm.addListener(onAlarm);

// on message receive
chrome.runtime.onMessage.addListener(receiveMessage);
