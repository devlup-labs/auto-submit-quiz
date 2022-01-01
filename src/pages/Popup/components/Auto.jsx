import React from 'react';

import { Button } from '@mui/material';
import { Box } from '@mui/system';

class Auto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDiabled: true,
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
        <form noValidate autoComplete="off">
          <Box p={4} justifyContent="center">
            <Button variant="contained" onClick={this.onSubmitAuto}>
              Submit
            </Button>
          </Box>
        </form>
      </div>
    );
  }
}

export default Auto;
