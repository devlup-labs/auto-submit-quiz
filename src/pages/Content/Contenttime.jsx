import React, { useState, useEffect } from 'react';
import '../Popup/components/Clock.css';
import { Button, Grid } from '@mui/material';

const ContentTime = () => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(1);

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const add = (tempMin) => {
    if (tempMin === 59) {
      setHours((hours) => parseInt(hours) + 1);
      setMinutes(0);
    } else {
      setMinutes((minutes) => parseInt(minutes) + 1);
    }
  };

  const autosubmit = () => {
    if (document.querySelector('.ThHDze > div > div >div')) {
      document.querySelector('.ThHDze > div > div >div').click();
      resetTimer();
    } else {
      resetTimer();
      return;
    }
  };

  const tick = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    } else if (hours === 0 && minutes === 0 && seconds === 1) {
      autosubmit();
      resetTimer();
      return;
    } else if (minutes === 0 && seconds === 0) {
      setHours((hours) => hours - 1);
      setMinutes(59);
      setSeconds(59);
    } else if (seconds === 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else if (seconds > 0) {
      setSeconds((seconds) => seconds - 1);
    } else {
      console.log(`Other`);
    }
  };

  useEffect(async () => {
    await chrome.storage.sync.get('currentAlarmData', (data) => {
      var milliseconds =
        data['currentAlarmData']['endTime'] -
        data['currentAlarmData']['startTime'];
      var hour = Math.floor(milliseconds / 1000 / 60 / 60);
      setHours(hour);
      milliseconds -= hour * 1000 * 60 * 60;
      var minute = Math.floor(milliseconds / 1000 / 60);
      setMinutes(minute);
      milliseconds -= minute * 1000 * 60;
      var second = Math.floor(milliseconds / 1000);
      setSeconds(second);
      milliseconds -= second * 1000;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      tick();
      if (hours == 0 && minutes == 0 && seconds == 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div>
      <h2 className="heading">Timer</h2>
      <div className="time">
        <p className="text">{`${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
      </div>
      <Grid container spacing={0.5} className="buttons">
        <Grid item>
          {' '}
          <Button
            className="stopButton"
            variant="contained"
            size="small"
            style={{
              marginRight: '0.5rem',
            }}
            onClick={() => {
              setHours(0);
              setMinutes(0);
              setSeconds(0);
            }}
          >
            Stop
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            className="addButton"
            style={{
              marginLeft: '0.5rem',
            }}
            onClick={() => add(minutes)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentTime;
