import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, TextField, FormControl, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
});

class AddPrescription extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            AppointmentID: this.props.AppID,
            PrescriptionID: "",
            Refills:"",
            MedicineTypes: [],
            DueDate: null,
            DBDueDate: null,
            openForm: false,
        };
    }

    componentDidMount = () => {
        this.uploadMedicineTypes()
    };

    uploadMedicineTypes(){
        fetch(`http://157.230.214.92:4000/AllMedicines/`)
        .then(result => result.json())
        .then(Response => this.setState({ MedicineTypes:Response.data}))
        .catch(err => console.log(err));
    }

    handleSubmit= () =>{
        this.setState({openForm:false});
        fetch(`http://157.230.214.92:4000/AddPrescription`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                AppointmentID: this.state.AppointmentID,
                PrescriptionID:   this.state.PrescriptionID,
                DueDate:  this.state.DBDueDate,
                Refills:     this.state.Refills,
            })
        })
        .catch(err => console.log(err));
    };
    handleClickOpen = () => {
        this.setState({ 
            openForm: true,
            AppointmentID: this.props.AppID,
            PrescriptionID: "",
            Refills:"",
            DueDate: null,
            DBDueDate: null, 
        });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };

    DueDateChange = (d) =>{
        let DueDate=new Date(d)
        DueDate = this.FormatDate(DueDate);
        
        this.setState({DBDueDate:DueDate});
        this.setState({
            DueDate: d
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
    render(){
        return(
            <div>
                <Button variant="contained" color="primary" fullWidth className={this.props.Button} onClick={this.handleClickOpen}>
                    Add a Prescription
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Add A Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information to add a new Diagnosis
                        </DialogContentText>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="PrescriptionID"
                                select
                                label="Please Choose A Prescription"
                                name="PrescriptionID"
                                variant="standard"
                                onChange={e=>this.handleChange(e)}
                                value={this.state.PrescriptionID}   
                                required                   
                            >
                            {this.state.MedicineTypes.map(option => (
                                <MenuItem key={option.PrescriptionID} value={option.PrescriptionID}>
                                    {option.Medicine}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField 
                                name="Refills"
                                label="Number of Total Refills" 
                                type="number"
                                variant="standard"
                                onChange={this.handleChange}
                                value={this.state.Refills}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    minDate={new Date()}
                                    label="Due Date"
                                    name="DueDate"
                                    value={this.state.DueDate}
                                    onChange={this.DueDateChange}
                                />
                            </MuiPickersUtilsProvider>
                            <Button onClick={this.handleSubmit} disabled={this.state.Refills=== "" || this.state.PrescriptionID=== "" || this.state.DBDueDate=== null} color="primary">
                                Submit
                            </Button>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

AddPrescription.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(AddPrescription);