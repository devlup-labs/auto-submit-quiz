import React from 'react';

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
          <Button variant="contained" onClick={this.onSubmitAuto}>
            Find Form
          </Button>
        </Box>
      </div>
    );
  }
}

export default Auto;
