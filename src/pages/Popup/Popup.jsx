import React from 'react';
import './Popup.css';

import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import UpcomingAlarm from './components/UpcomingAlarm';

// const Popup = () => {
// return (
//   <div className="App">
//     <Navbar />
//     <Content />
//     <Footer />
//   </div>
// );
// };
class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 0,
    };
  }
  changeTab = (tab) => this.setState({ tab: tab });
  render() {
    var MainContent;
    if (this.state.tab === 0) MainContent = <Content />;
    if (this.state.tab === 1) MainContent = <UpcomingAlarm />;
    return (
      <div className="App">
        <Navbar />
        {MainContent}
        <Footer data={this.changeTab} />
      </div>
    );
  }
}
export default Popup;
