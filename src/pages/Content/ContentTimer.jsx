import React from 'react';
import CountDownTimer from '../Popup/components/Clock';

var hoursMinSecs = { hours: 3, minutes: 20, seconds: 40 };
var start = 0;
var end = 0;

chrome.storage.sync.get('startTime', function (items) {
  start = items.startTime;
  console.log(start);
});

chrome.storage.sync.get('endTime', function (items) {
  end = items.endTime;
});
function GetTimeDiffInHoursMinutesSeconds(diff) {
  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  //alert(hh + ":" + mm + ":" + ss);
  hoursMinSecs['hours'] = hh;
  hoursMinSecs['minutes'] = mm;
}
class ContentTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '7',
      minutes: '20',
      seconds: '01',
    };

    GetTimeDiffInHoursMinutesSeconds(end - start);
    hoursMinSecs['seconds'] = this.state.seconds;
  }

  render() {
    return (
      <div>
        <CountDownTimer hoursMinSecs={hoursMinSecs} />
      </div>
    );
  }
}
export default ContentTimer;
