import React, { Children } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Manual from './Manual';
import Auto from './Auto';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return <div>{value === index && <Box>{children}</Box>}</div>;
}

const Content = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box m={1} pl={2}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Manual"></Tab>
          <Tab label="Automatic"></Tab>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Manual />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Auto />
      </TabPanel>
    </div>
  );
};

export default Content;
