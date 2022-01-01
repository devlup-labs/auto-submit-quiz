import React from 'react';
import ReactDOM from 'react-dom';
import ContentTimer from './ContentTimer';
import './content.styles.css';

class App extends React.Component {
  render() {
    return (
      <div
        className="timer-bg"
        style={{ position: 'fixed', textAlign: 'center' }}
      >
        <h1 className="heading"> {'Timer'} </h1>
        <ContentTimer />
      </div>
    );
  }
}

chrome.storage.sync.get('throughExtension', (items) => {
  console.log(`throughExtension: ${items.throughExtension}`);

  if (items.throughExtension) {

    let container = document.createElement('div');
    container.setAttribute('id', 'app-wrapper');
    document.body.prepend(container);

    ReactDOM.render(<App />, container);

    chrome.storage.sync.get('formLink', (items) => {
      console.log(`Form link: ${items.formLink}`);
    });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.AutoSumitButton?.newValue) {
    chrome.storage.sync.get('AutoSumitButton', (items) => {
      if (items.AutoSumitButton) {
        console.log('Auto-submit content works');
        if (
          document.querySelector('div.asQXV.hnID5d') &&
          document.querySelector('div.r0VQac.QRiHXd.Aopndd > a')
        ) {
          let form = document.querySelector('div.r0VQac.QRiHXd.Aopndd > a');
          let formlink = form.href;
          chrome.storage.sync.set({ throughExtension: true });
          let dueTimeDiv = document.querySelector('div.asQXV.hnID5d');
          let EndTimeTemp = dueTimeDiv.innerText;
          let EndTime1 = EndTimeTemp.replace('Due ', '');
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
          var EndTime2 = today + ' ' + EndTime1;
          console.log(EndTime2);
          var EndTime3 = new Date(EndTime2);

          console.log(Date.parse(EndTime3));
          let CurrentDate = new Date();
          console.log(Date.parse(CurrentDate));
          chrome.storage.sync.set({ startTime: Date.parse(CurrentDate) });
          chrome.storage.sync.set({ formLink: formlink });
          chrome.storage.sync.set({ endTime: Date.parse(EndTime3) });
          chrome.storage.sync.set({ AutoFinalValuesAdded: true });
          chrome.storage.sync.set({ AutoSumitButton: false });
        }
        chrome.storage.sync.set({ AutoSumitButton: false });
      }
    });
  }
});

chrome.storage.sync.set({ throughExtension: false });
