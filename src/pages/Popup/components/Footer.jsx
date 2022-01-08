
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HomeIcon from '@mui/icons-material/Home';
export default function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          props.data(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Alarms" icon={<AccessAlarmIcon />} />
      </BottomNavigation>
    </Box>
  );
}

