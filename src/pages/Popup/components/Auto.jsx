import React, { useState } from 'react';

import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

class Auto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SubmitDiabled: true,
    };
    this.onSubmitAuto = this.onSubmitAuto.bind(this);
  }
  async componentDidMount() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let url = tab.url;
    if (
      url.match('https://classroom.google.com/+') != null &&
      url.includes('/details')
    ) {
      console.log('this the page to activate the button ');
      this.setState({
        SubmitDiabled: false,
      });
    }
  }
  onSubmitAuto(event) {
    console.log('auto submit button is working');
    chrome.storage.sync.set({ AutoSumitButton: true });
  }

  render() {
    return (
      <div>
        <Box
          p={2}
          justifyContent="center"
          // margin={5}
          marginBottom={7.8}
          // marginTop={5.1}
        >
          <Typography margin={5} marginBottom={7} marginTop={3}>
            Click to Start the Quiz
          </Typography>
          <Button
            variant="contained"
            disabled={this.state.SubmitDiabled}
            onClick={this.onSubmitAuto}
          >
            Find Form
          </Button>
        </Box>
      </div>
    );
  }
}

export default Auto;
