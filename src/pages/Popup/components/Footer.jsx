import React from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import BButton from "./BButton";
class Footer extends React.Component {
    render() {
        return (
            <Container >

                <Grid container spacing={0} justifyContent="center">
                    <BButton name={"Submit"} />
                    <BButton name={"Reset"} />
                </Grid>
            </Container >
        );
    }
}
export default Footer;


