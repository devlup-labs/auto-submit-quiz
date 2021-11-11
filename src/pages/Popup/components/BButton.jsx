import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import { ResetTvTwoTone } from '@mui/icons-material';

const BButton = ({ name, reset }) => {

    return (
        <Box m={1} pt={2} display="block">

            <Button variant="contained"
                onClick={onreset}
            >
                {name}


            </Button>
        </Box>
    );
};
export default BButton