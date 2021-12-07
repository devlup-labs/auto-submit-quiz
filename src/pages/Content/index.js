
import React from 'react';
import ReactDOM from 'react-dom';
import Contenttime from "./Contenttime";

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
chrome.storage.sync.get("throughextension", function (items){        
  console.log(items.throughextension)
  if(items.throughextension===true)
  {
    let container = document.createElement('div');
  container.setAttribute("id", "app-wrapper");
  document.body.prepend(container);

  ReactDOM.render(
    <App/>, container);
  chrome.storage.sync.get("flink", function (items){        
    console.log(items.flink)
  });

  }
});

  
chrome.storage.sync.set({"throughextension":false});