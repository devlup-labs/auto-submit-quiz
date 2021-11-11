import React from 'react';
import './Popup.css';
import Greetings from '../../containers/Greetings/Greetings';
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Manual from "./components/Manual";
import Auto from './components/Auto';
const Popup = () => {
  return (
    <div className="App">
      <Navbar />
      <Content />
      {/* <Footer /> */}
    </div>
  );
};

export default Popup;
