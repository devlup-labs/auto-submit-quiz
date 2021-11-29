import React from 'react';
import ReactDOM from 'react-dom';
import Timer from "../Popup/components/Clock";
import { Button } from '@mui/material';
// import CountdownTimer from "react-component-countdown-timer";
import CountDownTimer from "../Popup/components/Clock";

var hoursMinSecs={hours:0, minutes: 20, seconds: 40};
class Contenttime extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hours: "0",
            minutes: "20",
            seconds: "40"
        };
    }
    hoursMinSecs = {hours:1, minutes: 20, seconds: 40}
    render(){
        return(
            <div>
                <CountDownTimer hoursMinSecs={hoursMinSecs}/>
                <Button variant="contained" size="small" onClick={this.onSubmit}>Stop</Button>
                <Button variant="contained" size="small" onClick={this.onSubmit}>Add</Button>
            {/* <Timer/> */}
            {/* <CountdownTimer count={5432} hideDay={true}/> */}
            </div>
        );
    }

}
export default Contenttime