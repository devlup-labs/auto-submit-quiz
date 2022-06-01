import React from 'react';
import ReactDOM from 'react-dom';
import ContentTime from './ContentTime';
import './content.styles.css';
import { getDataFromStorage } from '../Popup/scripts/storage.js';

class App extends React.Component {
  render() {
    return (
      <div
        className="timer-bg"
        style={{ position: 'fixed', textAlign: 'center' }}
      >
        <ContentTime />
      </div>
    );
  }
}

function isformpresent() {
  if (
    document.querySelector('div.asQXV.hnID5d') &&
    document.querySelector('div.r0VQac.QRiHXd.Aopndd > a')
  ) {
    console.log('form is here');
  }
}

chrome.storage.sync.get('currentAlarmData', async (data) => {
  if (data['currentAlarmData']['openedThroughExtension'] === true) {
    let container = document.createElement('div');
    container.setAttribute('id', 'app-wrapper');
    document.body.prepend(container);
    ReactDOM.render(<App />, container);
    let details = await getDataFromStorage('currentAlarmData');
    details['openedThroughExtension'] = false;
    chrome.storage.sync.set({ currentAlarmData: details });
  }
});

async function SetValues(CurrentDate, formLink, EndTime3) {
  console.log(`endtime parse ` + Date.parse(EndTime3));
  console.log(`startime parse ` + Date.parse(CurrentDate));

  await chrome.storage.sync.set({ start_time: Date.parse(CurrentDate) });
  await chrome.storage.sync.set({ flink: formLink });
  await chrome.storage.sync.set({ end_time: Date.parse(EndTime3) });
  chrome.storage.sync.get('flink', function (items) {
    var link = items.flink;
    console.log(`form link is ` + link);
    chrome.runtime.sendMessage(
      { greeting: 'Open the form will you?' },
      function (response) {
        console.log(response.farewell);
      }
    );
  });
}
// async function isitactive() {
//   chrome.runtime.sendMessage(
//     { greeting: 'check the tab is active?' },
//     function (response) {
//       console.log(response.farewell);
//     }
//   );
// }
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.autoSumitButton?.newValue) {
    chrome.storage.sync.get('autoSumitButton', function (items) {
      if (items.autoSumitButton === true) {
        console.log('i am autosubmit content working');
        // isitactive();
        if (
          document.querySelector('div.asQXV.hnID5d') &&
          document.querySelector('div.r0VQac.QRiHXd.Aopndd > a')
        ) {
          let form = document.querySelector('div.r0VQac.QRiHXd.Aopndd > a');
          let formLink = form.href;
          if (formLink.includes('/form')) {
            console.log(`it is from `);
            let DueTimeDiv = document.querySelector('div.asQXV.hnID5d');
            let EndTimeTemp = DueTimeDiv.innerText;
            let EndTime1 = EndTimeTemp.replace('Due ', '');
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            var EndTime2 = today + ' ' + EndTime1;
            var EndTime3 = new Date(EndTime2);
            let CurrentDate = new Date();
            SetValues(CurrentDate, formLink, EndTime3);

            chrome.storage.sync.set({ openedThroughExtension: true });
            chrome.storage.sync.set({ autoSumitButton: false });
          } else {
            alert('No Form Present');
          }
        }
        chrome.storage.sync.set({ autoSumitButton: false });
      }
    });
  }
});

// chrome.storage.sync.set({ openedThroughExtension: false });
