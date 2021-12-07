import React from 'react';
import ReactDOM from 'react-dom';
import Contenttime from "../../Content/Contenttime";

// chrome.storage.local.get('formlink', function (result) {
//   var channels = result.formlink;
//   alert(channels);
// })
class App extends React.Component {
 
  render() {
    return (
        <div style={{position: 'fixed', backgroundColor: '#f4c2c2' , textAlign:'center'}}>
            <h1>Lets Go!!!</h1>
            <Contenttime/>
        </div>
    );
  }
};

let container = document.createElement('div');
container.setAttribute("id", "app-wrapper");
document.body.prepend(container);

ReactDOM.render(
  <App/>, container);