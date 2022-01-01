import React from 'react';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import FormButton from './Button';

const Footer = () => {
  return (
    <Container>
      <Grid container spacing={0} justifyContent="center">
        <FormButton name={'Submit'} />
        <FormButton name={'Reset'} />
      </Grid>
    </Container>
  );
};

export default Footer;
