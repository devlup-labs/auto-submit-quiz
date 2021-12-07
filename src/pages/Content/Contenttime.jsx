import React from 'react';
import ReactDOM from 'react-dom';
import Timer from "../Popup/components/Clock";
import { Button, makeStyles } from '@mui/material';
// import CountdownTimer from "react-component-countdown-timer";
import CountDownTimer from "../Popup/components/Clock";
import {MakeTimmer} from "../Popup/Scripts/AfterOpeningForm";
var hoursMinSecs={hours:3, minutes: 20, seconds: 40};
var start=0;
var end=0;
chrome.storage.sync.get("start_time", function (items){        
    //console.log(items.start_time)
    start=items.start_time;
    console.log(start);

  });
chrome.storage.sync.get("end_time ", function (items){        
    //console.log(items.end_time )
    end=items.end_time
    
    console.log(end[0]);
  });
  setTimeout(()=>{
      console.log(end-start)
  },5000)
//console.log(start);
class Contenttime extends React.Component{
    constructor(props) {
        // starttime=5
        super(props);
        this.state = {
            hours: "7",
            minutes: "20",
            seconds: "20"
        };
        this.reset=this.reset.bind(this);
        hoursMinSecs["hours"]=this.state.hours
        hoursMinSecs["minutes"]=this.state.minutes
        hoursMinSecs["seconds"]=this.state.seconds
    }
    
    reset(event)
    {
        
        console.log("i am stop")
        this.setState({
            hours: "2",
            minutes: "22",
            seconds: "2"
        });

    }
    render(){
        return(
            <div>
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            {/* <Button variant="contained" size="small" onClick={this.reset}>Stop</Button>
            <Button variant="contained" size="small" onClick={console.log("add button")}>Add</Button> */}
            </div>
        );
    }

}
export default Contenttime