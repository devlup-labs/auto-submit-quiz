import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return <div>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
};

const Navbar = (jj) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <h1 style={{ marginTop: '2px', marginBottom: '1px' }}>
        {' '}
        Quiz-Auto-submit
      </h1>
    </Container>
  );
};

export default Navbar;
