import React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import { addCustomAlarm } from '../scripts/alarm.js';

class Manual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLink: '',
      startTime: '',
      endTime: '',
      nameError: false,
      startTimeError: false,
      endTimeError: false,
      submitDiabled: true,
      formLinkError: false,
      alarmName: '',
    };
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formFieldCheck = this.formFieldCheck.bind(this);
  }

  handleNameChange = async (event) => {
    var name = event.target.value;
    var tempNameError = false;
    if (name === '') {
      tempNameError = true;
    }
    this.setState({
      alarmName: name,
      nameError: tempNameError,
    });
    chrome.storage.sync.set({ alarmNameToBeDisplayed: name });
    this.formFieldCheck();
  };

  handleLinkChange = async (event) => {
    var link = event.target.value;
    var tempLinkError = false;
    if (
      !link.match('https://forms.gle+') &&
      !link.match('https://docs.google.com/forms+')
    ) {
      tempLinkError = true;
    }
    await this.setState({
      formLink: link,
      formLinkError: tempLinkError,
    });
    this.formFieldCheck();
  };

  handleStartTimeChange = async (event) => {
    var start = event.target.value;
    var tempStartTimeError = false;
    var startTime = new Date(start);
    if (start === '' || startTime < new Date()) {
      tempStartTimeError = true;
    }
    await this.setState({
      startTime: start,
      startTimeError: tempStartTimeError,
    });
    if (this.state.endTime !== '') {
      var endTimeVal = new Date(this.state.endTime);
      if (startTime >= endTimeVal && !tempStartTimeError) {
        this.setState({
          endTimeError: true,
        });
      } else {
        this.setState({
          endTimeError: false,
        });
      }
    }
    this.formFieldCheck();
  };

  handleEndTimeChange = async (event) => {
    var end = event.target.value;
    var tempEndTimeError = false;
    var startTime = new Date(this.state.startTime);
    var endTime = new Date(end);
    if (end === '' || endTime < new Date() || startTime >= endTime) {
      tempEndTimeError = true;
    }
    await this.setState({
      endTimeError: tempEndTimeError,
      endTime: end,
    });
    this.formFieldCheck();
  };

  onReset = () => {
    this.setState({
      alarmName: '',
      formLink: '',
      startTime: '',
      endTime: '',
      nameError: false,
      endTimeError: false,
      formLinkError: false,
      startTimeError: false,
      submitDiabled: true,
    });
  };

  formFieldCheck = () => {
    if (
      this.state.nameError === false &&
      this.state.endTimeError === false &&
      this.state.startTimeError === false &&
      this.state.formLinkError === false &&
      this.state.alarmName !== '' &&
      this.state.endTime !== '' &&
      this.state.startTime !== ''
    ) {
      this.setState({ submitDiabled: false });
    } else {
      this.setState({ submitDiabled: true });
    }
  };

  onSubmit = async () => {
    var newAlarm = {
      alarmName: this.state.alarmName,
      formLink: this.state.formLink,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      submitClicked: true,
    };
    await addCustomAlarm(newAlarm);
    this.onReset();
  };

  render() {
    return (
      <div style={{ height: '300px' }}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          type="text"
          autoComplete="off"
          style={{ width: '90%', marginTop: '8px' }}
          value={this.state.alarmName}
          onChange={this.handleNameChange}
        />
        <TextField
          id="standard-basic"
          label="Form Link"
          variant="standard"
          autoComplete="off"
          style={{ width: '90%', marginTop: '8px' }}
          value={this.state.formLink}
          onChange={this.handleLinkChange}
          error={this.state.formLinkError}
        />
        <TextField
          size="small"
          id="date"
          label="Start Time"
          type="datetime-local"
          style={{ width: '90%', marginTop: '1rem' }}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
          error={this.state.startTimeError}
        />
        <TextField
          size="small"
          id="date"
          label="End Time"
          type="datetime-local"
          style={{ width: '90%', marginTop: '1rem' }}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.endTime}
          onChange={this.handleEndTimeChange}
          error={this.state.endTimeError}
        />

        <Grid container justifyContent="center">
          <Button
            variant="contained"
            style={{ margin: '1.5rem 1rem 1rem', borderRadius: '2rem' }}
            onClick={this.onSubmit}
            disabled={this.state.submitDiabled}
          >
            Submit
          </Button>
          <Button
            style={{ margin: '1.5rem 1rem 1rem', borderRadius: '2rem' }}
            variant="contained"
            onClick={this.onReset}
          >
            Reset
          </Button>
        </Grid>
      </div>
    );
  }
}
export default Manual;
