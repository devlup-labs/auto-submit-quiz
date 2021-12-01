
import React from 'react'
import { Button } from '@mui/material';

const CountDownTimer = ({hoursMinSecs}) => {
   
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    const tick = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0) 
           reset()
           
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    //const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    const reset = () => setTime([0,0,0]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
    return (
        <div>
        
            <div>
                <p>{`${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
           
            </div>
            <div>
            <Button variant="contained" size="small"  onClick={()=> setTime([0,0,0])}>Stop</Button>
            <Button variant="contained" size="small" onClick={()=> setTime([hrs,mins+1,secs])} >Add</Button>
            </div>
        </div>
    );
}

export default CountDownTimer;