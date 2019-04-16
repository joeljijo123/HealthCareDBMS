import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            Report: [],
        };
    }
    fetchInsurances(){
        fetch(`http://162.243.165.50:4000/AllInsurance`)
        .then(result => result.json())
        .then(Response => this.setState({ Report:Response.data }))
        .catch(err => console.log(err))
    };
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
   
    handleClickOpen = () => {
        this.fetchInsurances();
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ 
            Report: [],
            openForm:false,
        });
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
            <Typography variant="h5">Insurances Report</Typography>
               
                <Button variant="contained" color="inherit" fullWidth className={classes.Button} onClick={this.handleClickOpen} disabled={((this.state.MinimumDate === null || this.state.MaximumDate === null) && !this.state.checkAllDates) || this.state.ChosenDoctor === ""}>
                    Show Patient Insurances
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Here are the Insurances of the Patients</DialogTitle>
                    <DialogContent>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Patient ID</TableCell>
                                    <TableCell align="center">Deductible</TableCell>
                                    <TableCell align="center">Contact Number</TableCell>
                                    <TableCell align="center">Insurance Name</TableCell>
                                    <TableCell align="center">Insurance Client ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                        {this.state.Report.map(Each => (
                                            <TableRow key={Each.PatientID}>
                                                <TableCell align="center">{Each.PatientID}</TableCell>
                                                <TableCell align="center">{Each.Deductible}</TableCell>
                                                <TableCell align="center">{Each.ContactNumber}</TableCell>
                                                <TableCell align="center">{Each.Name}</TableCell>
                                                <TableCell align="center">{Each.InsuranceClientID}</TableCell>
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
