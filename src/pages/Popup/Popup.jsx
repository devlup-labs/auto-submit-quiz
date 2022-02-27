import React from 'react';
import Content from './components/Content';
import Footer from './components/Footer';
import UpcomingAlarm from './components/UpcomingAlarm';

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 0,
    };
  }

  changeTab = (tab) => this.setState({ tab: tab });

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Google Forms Auto Submit</h1>
        {this.state.tab === 0 ? <Content /> : <UpcomingAlarm />}
        <Footer data={this.changeTab} />
      </div>
    );
  }
}
export default Popup;
