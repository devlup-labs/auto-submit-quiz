import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';

class Manual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formlink: '',
      starting_time: '',
      ending_time: '',
      startTimeError: false,
      endTimeError: false,
      submitDiabled: true,
    };

    this.handlelinkChange = this.handlelinkChange.bind(this);
    this.handletimeChange = this.handletimeChange.bind(this);
    this.handletimeChangeending = this.handletimeChangeending.bind(this);
    this.onreset = this.onreset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.check = this.check.bind(this);
  }

  handlelinkChange(event) {
    var link = event.target.value;

    this.setState({
      formlink: link,
    });
  }

  handletimeChange = async (event) => {
    var start = event.target.value;
    var error = false;
    var StartTime = new Date(start);
    if (start === '') {
      error = true;
    }
    await this.setState({
      starting_time: start,
      startTimeError: error,
    });
    if (this.state.ending_time !== '') {
      var endTimeVal = new Date(this.state.ending_time);
      if (StartTime >= endTimeVal) {
        error = true;
        this.setState({
          endTimeError: error,
        });
      }
    }
    this.check();
  };

  handletimeChangeending = async (event) => {
    var end = event.target.value;
    var error = false;
    var StartTime = new Date(this.state.starting_time);
    var EndTime = new Date(end);
    if (end === '' || EndTime < new Date() || StartTime >= EndTime) {
      error = true;
    }
    await this.setState({
      endTimeError: error,
      ending_time: end,
    });
    //console.log(error);
    this.check();
  };

  onreset = (event) => {
    console.log('i am reset');
    this.setState({
      formlink: '',
      starting_time: '',
      ending_time: '',
    });
    chrome.alarms.clear('Open the form', function () {
      console.log('Alarm cleared Enter the new values');
    });
  };

  check = () => {
    if (
      this.state.endTimeError === false &&
      this.state.startTimeError === false &&
      this.state.ending_time !== '' &&
      this.state.starting_time !== ''
    ) {
      console.log('check is working');
      this.setState({ submitDiabled: false });
    } else {
      console.log('check else is working');
      this.setState({ submitDiabled: true });
    }
    console.log(this.state.endTimeError);
    console.log(this.state.startTimeError);
    console.log(this.state.ending_time);
    console.log(this.state.starting_time);
  };

  onSubmit = (event) => {
    var link = this.state.formlink;
    var starttime = this.state.starting_time;
    var endtime = this.state.ending_time;
    var StartTimeInMilliseconds = Date.parse(starttime);
    var EndTimeInMilliseconds = Date.parse(endtime);

    console.log('i am submit');
    chrome.storage.sync.set({ throughExtension: true });
    chrome.storage.sync.set({ startTime: StartTimeInMilliseconds });
    chrome.storage.sync.set({ formLink: link });
    chrome.storage.sync.set({ endTime: EndTimeInMilliseconds });
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now = now.toISOString().slice(0, 16);
    var CurrentDateAndTimeInMilliSeconds = Date.parse(now);
    var StartTimeMilliSeconds = Date.parse(starttime);

    if (
      StartTimeMilliSeconds - CurrentDateAndTimeInMilliSeconds <= 8000 &&
      StartTimeMilliSeconds - CurrentDateAndTimeInMilliSeconds >= 0
    ) {
      chrome.storage.sync.set({
        DiffBtwStartAndCurrent: 1000,
      });
    } else {
      chrome.storage.sync.set({
        DiffBtwStartAndCurrent:
          StartTimeMilliSeconds - CurrentDateAndTimeInMilliSeconds,
      });
    }
  };

  render() {
    return (
      <div margin="0">
        <form noValidate autoComplete="off">
          <Box m={1}>
            <TextField
              id="standard-basic"
              label="Form Link"
              variant="standard"
              size="large"
              fullWidth
              fontSize="50"
              value={this.state.formlink}
              onChange={this.handlelinkChange}
            ></TextField>
          </Box>

          <Grid container style={{ gap: 15 }} justifyContent="center">
            <Grid item></Grid>
            <Grid item>
              <TextField
                size="small"
                id="date"
                label="Start Time"
                type="datetime-local"
                //type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.starting_time}
                onChange={this.handletimeChange}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="date"
                label="End Time"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.ending_time}
                onChange={this.handletimeChangeending}
              />
            </Grid>
          </Grid>

          <Grid container spacing={0} justifyContent="center">
            {/* <Button name={"Submit"} />
                        <Button name={"Reset"} reset={this.onreset}
                        /> */}
            <Box m={1} pt={2} display="block">
              <Button variant="contained" onClick={this.onreset}>
                Reset
              </Button>
            </Box>
            <Box m={1} pt={2} display="block">
              <Button
                variant="contained"
                onClick={this.onSubmit}
                disabled={this.state.submitDiabled}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </form>
      </div>
    );
  }
}
export default Manual;
