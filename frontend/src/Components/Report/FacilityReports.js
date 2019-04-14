import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/ThreeSixty';
import Icon from '@material-ui/core/Icon';
import { withStyles, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField, MenuItem } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const styles = theme =>({
    Button: {
        marginTop: '2%',
    },
});


class FacilityReports extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            checkAllDates: false,
            ChosenFacility: "",
            MinimumDate: null,
            MaximumDate: null,
            MinimumDateDB: "null",
            MaximumDateDB: "null",
            Facilities: [],
            Report:[],

        };
    }
    componentDidMount(){
        this.uploadFacilities();
    }
    uploadDoctors(){

    }
    fetchFacilityReport(){
        
        fetch(`http://157.230.214.92:4000/FacilityAppointmentReport/${this.state.ChosenFacility}/${this.state.MinimumDateDB}/${this.state.MaximumDateDB}`)
        .then(result => result.json())
        .then(Response => this.setState({ Report:Response.data }))
        .catch(err => console.log(err))
    }
    fetchDoctorReport(){
        fetch(`http://157.230.214.92:4000/DoctorReport/${this.state.ChosenFacility}`)
        .then(result => result.json())
        .then(Response => this.setState({ DoctorsCount:Response.data[0].Count }))
        .catch(err => console.log(err))
    }
    uploadFacilities(){
        fetch(`http://157.230.214.92:4000/Facilities`)
        .then(result => result.json())
        .then(Response => this.setState({ Facilities:Response.data }))
        .catch(err => console.log(err))
    }
    MinDateChange = (d) =>{
        let ApptDate=new Date(d)
        ApptDate = this.FormatDate(ApptDate);
        this.setState({MinimumDateDB:ApptDate});
        this.setState({
            MinimumDate: d
        })
    }
    MaxDateChange = (d) =>{
        let ApptDate=new Date(d)
        ApptDate = this.FormatDate(ApptDate);
        this.setState({MaximumDateDB:ApptDate});
        this.setState({
            MaximumDate: d
        })
    }
    FormatDate=(date)=>{
        date = date.getFullYear() + '-' + (this.fixMonth(date)) + '-' + date.getDate();
        return date;
    }

    fixMonth=(date)=>{
        if(date.getMonth() + 1 < 10){
            return "0" +(date.getMonth() +1);
        }
        else{
            return date.getMonth()+1;
        }
    }
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handlechoseChange = name => event =>{
        this.setState({ 
            [name]: event.target.checked,
            MinimumDate: null,
            MaximumDate: null,
            MinimumDateDB: "null",
            MaximumDateDB: "null"});
      };
    handleClickOpen = () => {
        this.fetchFacilityReport();
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ 
            openForm: false,
            checkAllDates: false,
            ChosenFacility: "",
            MinimumDate: null,
            MaximumDate: null,
            MinimumDateDB: "null",
            MaximumDateDB: "null", 
            Report:[],
        });
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
            <Typography variant="h5">Facility Report</Typography>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        id="ChosenFacility"
                        select
                        label="Please Choose A Facility"
                        name="ChosenFacility"
                        variant="standard"
                        onChange={this.handleChange}
                        value={this.state.ChosenFacility}   
                        required                   
                    >
                        <MenuItem key="-1" value="-1">
                            All Facilities
                        </MenuItem>
                        {this.state.Facilities.map(option => (
                            <MenuItem key={option.FacilityID} value={option.FacilityID}>
                                {option.FacilityName}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.checkAllDates}
                        onChange={this.handlechoseChange('checkAllDates')}
                        value="checkAllDates"
                        />
                    }
                    label="Generate Report for all Dates"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        label="From Date"
                        name="MinimumDate"
                        value={this.state.MinimumDate}
                        onChange={this.MinDateChange}
                        fullWidth
                        disabled={this.state.checkAllDates}
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        label="To Date"
                        name="MaximumDate"
                        value={this.state.MaximumDate}
                        onChange={this.MaxDateChange}
                        fullWidth
                        disabled={this.state.checkAllDates}
                    />
                </MuiPickersUtilsProvider>
                <Button variant="contained" color="inherit" fullWidth className={classes.Button} onClick={this.handleClickOpen} disabled={((this.state.MinimumDate === null || this.state.MaximumDate === null) && !this.state.checkAllDates) || this.state.ChosenFacility === ""}>
                    Show reports for the Chosen Facility
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Here is the Facility Report</DialogTitle>
                    <DialogContent>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>FacilityID</TableCell>
                                    <TableCell align="center">Number of Doctors</TableCell>
                                    <TableCell align="center">Upcoming Appointments</TableCell>
                                    <TableCell align="center">Cancelled Appointments</TableCell>
                                    <TableCell align="center">Completed Appointments</TableCell>
                                    <TableCell align="center">Total Appointments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.Report.map(Each => (
                                    <TableRow key={Each.FacilityID}>
                                        <TableCell align="center">{Each.FacilityID}</TableCell>
                                        <TableCell align="center">{Each.DoctorsWorking}</TableCell>
                                        <TableCell align="center">{Each.UpcomingApps}</TableCell>
                                        <TableCell align="center">{Each.CancelledApps}</TableCell>
                                        <TableCell align="center">{Each.CompletedApps}</TableCell>
                                        <TableCell align="center">{Each.totalApps}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

FacilityReports.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FacilityReports);
