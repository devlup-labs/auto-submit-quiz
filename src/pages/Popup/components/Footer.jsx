import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HomeIcon from '@mui/icons-material/Home';

const Footer = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          props.data(newValue);
          setValue(newValue);
        }}
        style={{ width: '100%', bottom: 0 }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Alarms" icon={<AccessAlarmIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Footer;
