import React from 'react'; import SvgIcon from '@mui/material/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/core';
import Box from '@mui/material/Box';
import BButton from "./BButton";
import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { AfterOpeningForm } from "../Scripts/AfterOpeningForm";
var formlink;
var starting_time;
var ending_time;
class Manual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formlink: "",
            starting_time: "",
            ending_time: ""
        };

        this.handlelinkChange = this.handlelinkChange.bind(this);
        this.handletimeChange = this.handletimeChange.bind(this);
        this.handletimeChangeending = this.handletimeChangeending.bind(this);
        this.onreset = this.onreset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    handlelinkChange(event) {
        var link = event.target.value;
        this.setState(
            {
                formlink: link,
            }
        );
        formlink = this.state.formlink
        console.log(formlink)
    }
    handletimeChange(event) {
        var start = event.target.value;
        this.setState(
            {
                starting_time: start,
            }
        );
        console.log(start)
        starting_time = start;
    }
    handletimeChangeending(event) {
        var end = event.target.value;
        this.setState(
            {
                ending_time: end,
            }
        );
        console.log("ending input is working")

        ending_time = end;
    }
    onreset(event) {
        console.log("i am reset")
        this.setState({
            formlink: "",
            starting_time: "",
            ending_time: ""
        });
    }
    AfterOpeningForm() {
        console.log("yayyy!!!")
    }
    onSubmit(event) {
        var link = this.state.formlink
        var starttime = this.state.starting_time
        var endtime = this.state.ending_time
        console.log("i am submit");
        AfterOpeningForm(link, starttime, endtime);


    }
    render() {
        return (
            < div margin="0" >
                <form noValidate autoComplete="off">
                    <Box m={1}>
                        <TextField id="standard-basic"
                            label="Form Link"
                            variant="standard"
                            size="large"
                            fullWidth
                            fontSize="50"
                            value={this.state.formlink}
                            onChange={this.handlelinkChange}
                        >
                        </TextField>
                    </Box>

                    <Grid container style={{ gap: 15 }} justifyContent="center">
                        <Grid item>

                        </Grid>
                        <Grid item >
                            <TextField

                                size="small"
                                id="date"
                                label="Start Time"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.starting_time}
                                onChange={this.handletimeChange}
                            />

                        </Grid>
                        <Grid item>
                            <TextField
                                size="small"
                                id="date"
                                label="End Time"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.ending_time}
                                onChange={this.handletimeChangeending}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} justifyContent="center">
                        {/* <BButton name={"Submit"} />
                        <BButton name={"Reset"} reset={this.onreset}
                        /> */}
                        <Box m={1} pt={2} display="block">

                            <Button variant="contained"
                                onClick={this.onreset}
                            >
                                Reset


                            </Button>
                        </Box>
                        <Box m={1} pt={2} display="block">

                            <Button variant="contained"
                                onClick={this.onSubmit}
                            >
                                Submit


                            </Button>
                        </Box>
                    </Grid>

                </form>
            </div >
        );
    }
}
export default Manual;
