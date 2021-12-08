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
var hours=0
var minutes=0
chrome.storage.sync.get("start_time", function (items){        
    //console.log(items.start_time)
    start=items.start_time;
    console.log(start);

  });
chrome.storage.sync.get("end_time", function (items){        
    //console.log(items.end_time )
    end=items.end_time
  });
function GetTimeDiffInHoursMinutesSeconds(diff)
{
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    //alert(hh + ":" + mm + ":" + ss);
    hoursMinSecs["hours"]=hh
    hoursMinSecs["minutes"]=mm


}
class Contenttime extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hours: "7",
            minutes: "20",
            seconds: "01"
        };
        var StartTimeInMilliseconds=Date.parse(start)
        var EndTimeInMilliseconds=Date.parse(end)
        GetTimeDiffInHoursMinutesSeconds(EndTimeInMilliseconds-StartTimeInMilliseconds)
        hoursMinSecs["seconds"]=this.state.seconds
    }
    
    render(){
        return(
            <div>
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            </div>
        );
    }

}
export default Contenttime