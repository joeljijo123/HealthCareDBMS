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


class DoctorsReport extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            checkAllDates: false,
            ChosenDoctor: "",
            MinimumDate: null,
            MaximumDate: null,
            MinimumDateDB: null,
            MaximumDateDB: null,
            Doctors: [],
            Report:[],

        };
    }
    componentDidMount(){
        this.uploadDoctors();
    }
    fetchDoctorReport(){
        fetch(`http://157.230.214.92:4000/DoctorReport/${this.state.ChosenDoctor}/${this.state.MinimumDateDB}/${this.state.MaximumDateDB}`)
        .then(result => result.json())
        .then(Response => this.setState({ Report:Response.data }))
        .catch(err => console.log(err))
    }
    uploadDoctors(){
        fetch(`http://157.230.214.92:4000/AllDoctors`)
        .then(result => result.json())
        .then(Response => this.setState({ Doctors:Response.data }))
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
            MinimumDateDB: null,
            MaximumDateDB: null});
      };
    handleClickOpen = () => {
        this.fetchDoctorReport();
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ 
            openForm: false,
            checkAllDates: false,
            ChosenDoctor: "",
            MinimumDate: null,
            MaximumDate: null,
            MinimumDateDB: null,
            MaximumDateDB: null, 
            Report:[],
        });
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
            <Typography variant="h5">Doctor Report</Typography>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        id="ChosenDoctor"
                        select
                        label="Please Choose A Facility"
                        name="ChosenDoctor"
                        variant="standard"
                        onChange={this.handleChange}
                        value={this.state.ChosenDoctor}   
                        required                   
                    >
                        <MenuItem key="-1" value="-1">
                            All Doctors
                        </MenuItem>
                        {this.state.Doctors.map(option => (
                            <MenuItem key={option.EmployeeID} value={option.EmployeeID}>
                                Dr. {option.FirstName} {option.LastName}
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
                <Button variant="contained" color="inherit" fullWidth className={classes.Button} onClick={this.handleClickOpen} disabled={((this.state.MinimumDate === null || this.state.MaximumDate === null) && !this.state.checkAllDates) || this.state.ChosenDoctor === ""}>
                    Show reports for the Chosen Doctor
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Here is the Doctor Report</DialogTitle>
                    <DialogContent>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">EmployeeID</TableCell>
                                    <TableCell align="center">Number of Appointments</TableCell>
                                    <TableCell align="center">Number of Diagnoses</TableCell>
                                    <TableCell align="center">Number of Cancelled Appointments</TableCell>
                                    <TableCell align="center">Number of Days Working in a week</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.Report.map(Each => (
                                    <TableRow key={Each.EmployeeID}>
                                        <TableCell align="center">{Each.EmployeeID}</TableCell>
                                        <TableCell align="center">{Each.Apps}</TableCell>
                                        <TableCell align="center">{Each.Diagnoses}</TableCell>
                                        <TableCell align="center">{Each.CancelledApps}</TableCell>
                                        <TableCell align="center">{Each.DaysWorking}</TableCell>
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

DoctorsReport.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DoctorsReport);
