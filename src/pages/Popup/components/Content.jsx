import React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Manual from './Manual';
import Auto from './Auto';

const Content = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <div>
        <Tabs centered value={value} onChange={handleChange}>
          <Tab label="Manual"></Tab>
          <Tab label="Automatic"></Tab>
        </Tabs>
      </div>
      {value == 0 ? <Manual /> : <Auto />}
    </div>
  );
};

export default Content;
