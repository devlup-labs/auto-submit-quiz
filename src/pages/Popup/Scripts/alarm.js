import { v4 as uuidv4 } from 'uuid';
import { setDataIntoStorage } from './storage';

class Alarm {
  constructor(name, link, startData, endData) {
    this.id = uuidv4();
    this.alarmName = name;
    this.formLink = link;
    this.startData = startData.toString();
    this.startTime = startData.getTime();
    this.endData = endData.toString();
    this.endTime = endData.getTime();
  }
}

const addCustomAlarm = async (alarm) => {
  var startDate = new Date(alarm.startTime);
  var startTime = startDate.getTime();
  startDate.setTime(startTime);
  var endDate = new Date(alarm.endTime);
  var endTime = endDate.getTime();
  endDate.setTime(endTime);
  var alarmData = new Alarm(
    alarm.alarmName,
    alarm.formLink,
    startDate,
    endDate
  );
  console.log(`Alarm Data:\n${JSON.stringify(alarmData)}`);
  setDataIntoStorage(alarmData.id, alarmData);
  chrome.alarms.create(alarmData.id, {
    when: alarmData.startTime,
    periodInMinutes: null,
  });
};

export { addCustomAlarm };
