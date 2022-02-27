import React, { Component } from 'react';
import {
  Box,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
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

  deleteAlarm = async (name) => {
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
            return (
              <ListItem key={alarm.id}>
                <ListItemIcon edge="start">
                  <AccessAlarmsIcon />
                </ListItemIcon>
                <ListItemText
                  style={{
                    width: '100%',
                  }}
                  primary={alarm.name}
                  secondary={alarm.time}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      this.deleteAlarm(alarm.name);
                    }}
                    style={{ marginRight: '2px' }}
                  >
                    <DeleteIcon style={{ fill: 'black' }} />
                  </IconButton>
                </ListItemSecondaryAction>
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
      <div style={{ height: '348px' }}>
        {(listOfAlarms.length > 0 && this.getAlarmsList(listOfAlarms)) || (
          <div
            style={{
              width: 'auto',
              height: '348px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1rem',
            }}
          >
            No alarms{' '}
            <span role="img" aria-label="alarm">
              ⏰
            </span>
          </div>
        )}
      </div>
    );
  }
}
