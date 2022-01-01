import {
  Box,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React, { Component } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
export default class UpcomingAlarm extends Component {
  constructor() {
    super();
    this.state = {
      listOfAlarms: [],
    };
  }
  async componentDidMount() {
    var alarms = await new Promise((resolve) => chrome.alarms.getAll(resolve));
    const AlarmsList = [];
    let AlarmsCount = 0;
    var time = new Date();
    for (let i = 0; i < alarms.length; i++) {
      time.setTime(alarms[i].scheduledTime);
      AlarmsList.push({
        time: time.toLocaleString(),
        id: AlarmsCount,
        name: alarms[i].name,
      });
      AlarmsCount++;
    }

    console.log(AlarmsList);
    this.setState({
      listOfAlarms: AlarmsList,
    });
  }
  deletealarm = async (name) => {
    var NewListOfAlarms = this.state.listOfAlarms;
    var index = 0;
    for (var i = 0; i < NewListOfAlarms.length; i++) {
      if (NewListOfAlarms[i].name === name) index = i;
    }
    if (index > -1) {
      NewListOfAlarms.splice(index, 1);
    }
    this.setState({
      listOfAlarms: NewListOfAlarms,
    });

    console.log(name);
    chrome.alarms.clear(name);
  };
  getAlarmsList = (listOfAlarms) => {
    return (
      <div className="alarmsList" style={{ width: '100%' }}>
        <List dense>
          {listOfAlarms.map((alarm) => {
            var name = alarm.name;
            return (
              <ListItem key={alarm.id}>
                <ListItemIcon edge="start">
                  <AccessAlarmsIcon />
                </ListItemIcon>

                <ListItemText
                  primary={'Hi Alarm here!!'}
                  secondary={alarm.time}
                />

                <ListItemButton onClick={() => this.deletealarm(alarm.name)}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

  render() {
    const { listOfAlarms } = this.state;
    return (
      <div>
        <Typography pt={2}>Upcoming Alarms</Typography>
        <Box>
          {(listOfAlarms.length > 0 && this.getAlarmsList(listOfAlarms)) || (
            <div style={{ padding: '1rem' }}>
              <Typography>No G-Form to fill</Typography>
            </div>
          )}
        </Box>
      </div>
    );
  }
}
