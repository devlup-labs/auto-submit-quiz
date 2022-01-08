import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import './Clock.css';
const CountDownTimer = ({ hoursMinSecs }) => {
  const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (hrs === 0 && mins === 0 && secs === 1) {
      autosubmit();
      setTime([hrs, mins, secs - 1]);
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  //const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
  const reset = () => setTime([0, 0, 0]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  function add(mins) {
    if (mins === 59) {
      setTime([parseInt(hrs) + 1, 0, secs]);
    } else setTime([hrs, parseInt(mins) + 1, secs]);
  }
  function autosubmit() {
    if (
      document.querySelector(
        'div.freebirdFormviewerViewNavigationNavControls > div > div > div'
      )
    ) {
      // chrome.storage.sync.set({"throughextension":false})
      document
        .querySelector(
          'div.freebirdFormviewerViewNavigationNavControls > div > div > div'
        )
        .click();
      setTime([0, 0, 0]);
    } else {
      return;
    }
  }
  return (
    <div>
      <div className="time">
        <p className="text">{`${hrs.toString().padStart(2, '0')}:${mins
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
      </div>
      {/* <Box m={0.75} mt={0} p={1} display="block">
        

        
      </Box> */}
      <Grid container spacing={0.5} className="buttons">
        <Grid item>
          {' '}
          <Button
            className="button"
            variant="contained"
            size="small"
            onClick={() => setTime([0, 0, 0])}
          >
            Stop
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="small" onClick={() => add(mins)}>
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CountDownTimer;
