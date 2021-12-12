import React from 'react';

import { Button } from '@mui/material';

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
        <form noValidate autoComplete="off">
          <Button variant="contained" onClick={this.onSubmitAuto}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Auto;
