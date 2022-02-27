import React from 'react';
import { Button, Typography } from '@mui/material';

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
      <div
        style={{
          width: 'auto',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1rem',
        }}
      >
        {this.state.SubmitDiabled === true ? (
          <div style={{ padding: '0 1.5rem' }}>
            This is not a Google Classroom Assignment Page{' '}
            <span role="img" aria-label="alarm">
              😕
            </span>
          </div>
        ) : (
          <div style={{ padding: '0 1.5rem', flexDirection: 'column' }}>
            Click the button to find a Google Form{' '}
            <span role="img" aria-label="alarm">
              📝
            </span>{' '}
            link on this page
            <div>
              <Button
                variant="contained"
                style={{ borderRadius: '2rem', marginTop: '1rem' }}
                onClick={this.onSubmitAuto}
              >
                Find Form
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Auto;
