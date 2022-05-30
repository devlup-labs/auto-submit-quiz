import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import {
  getAllDataFromStorage,
  removeDataFromStorage,
} from '../scripts/storage.js';

export default class UpcomingAlarm extends Component {
  constructor() {
    super();
    this.state = {
      listOfAlarms: [],
    };
  }

  async componentDidMount() {
    let data = await getAllDataFromStorage();
    var alarms = await new Promise((resolve) => chrome.alarms.getAll(resolve));
    const alarmsList = [];
    var time = new Date();
    for (let i = 0; i < alarms.length; i++) {
      time.setTime(alarms[i].scheduledTime);
      alarmsList.push({
        id: alarms[i].name,
        time: time.toLocaleString(),
        name: data[alarms[i].name].alarmName,
      });
    }
    this.setState({
      listOfAlarms: alarmsList,
    });
  }

  deleteAlarm = async (id) => {
    var newListOfAlarms = this.state.listOfAlarms;
    var index = 0;
    for (var i = 0; i < newListOfAlarms.length; i++) {
      if (newListOfAlarms[i].id === id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      chrome.alarms.clear(this.state.listOfAlarms[index].id);
      removeDataFromStorage(this.state.listOfAlarms[index].id);
      newListOfAlarms.splice(index, 1);
    }
    this.setState({
      listOfAlarms: newListOfAlarms,
    });
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
                      this.deleteAlarm(alarm.id);
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
