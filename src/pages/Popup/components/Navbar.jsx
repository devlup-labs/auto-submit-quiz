import React, { Children } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Manual from './Manual';
import Auto from "./Auto";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


const Navbar = (jj) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (


        <Container maxWidth='sm' >
            <h1 style={{ marginTop: '2px', marginBottom: '1px' }}> Quiz-Auto-submit</h1>
        </Container>
    );
}

export default Navbar;