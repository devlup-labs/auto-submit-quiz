import React from 'react'; import SvgIcon from '@mui/material/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button'
import { makeStyles } from '@mui/core';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SearchIcon from '@mui/icons-material/Search';

const Auto = () => {
    return (

        < div >
            <form noValidate autoComplete="off">
                {/* <Box pb={2}>
                    <Button variant="contained"
                        size="medium"
                        onClick={() => {
                            console.info("I'm a reset button.");
                        }}
                        endIcon={<SearchIcon />} >

                        Start

                    </Button>

                </Box> */}


                <Grid container style={{ gap: 15 }} justifyContent="center">
                    <Grid item sx={5}>
                        <TextField

                            size="small"
                            id="date"
                            label="Start Time"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />

                    </Grid>
                    <Grid item sx={5}>
                        <TextField
                            size="small"
                            id="date"
                            label="End Time"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />
                    </Grid>
                </Grid>

            </form>
        </div >
    );
}

export default Auto;