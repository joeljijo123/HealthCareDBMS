import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, TextField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
});

class AddSpecialistReccomendation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            AppointmentID: this.props.AppID,
            Specialist: "",
            Specialists: [],
            openForm: false,
        };
    }
    componentDidMount(){
        this.uploadSpecialists()
    }
    uploadSpecialists(){
        fetch(`http://162.243.165.50:4000/AllDoctors`)
        .then(result => result.json())
        .then(res => this.setState({ Specialists: res.data }))
        .catch(err => console.log(err))
    }
    handleSpecialistAdd= () =>{
        this.setState({openForm:false});
        fetch(`http://162.243.165.50:4000/AddSpecialist`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                AppointmentID: this.state.AppointmentID,
                Specialist:   this.state.Specialist,
            })
        })
        .then(window.location.replace('/Appointments'))
        .catch(err => console.log(err));
    };
    handleClickOpen = () => {
        this.setState({ 
            Specialist: "",
            openForm: true 
        });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };

    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        return(
            <div>
                <Button variant="contained" color="primary" fullWidth className={this.props.Button} onClick={this.handleClickOpen}>
                    Add a Specialist Reccomendation
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Add A Specialist Reccomendation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please select a Doctor (Specialist or General) that you reccomend for the patiet
                        </DialogContentText>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="Specialist"
                                select
                                label="Please Choose A Doctor to Reccomend"
                                name="Specialist"
                                variant="standard"
                                onChange={this.handleChange}
                                value={this.state.Specialist}   
                                required                   
                            >
                                {this.state.Specialists.map(option => (
                                    <MenuItem key={option.EmployeeID} value={option.FirstName}>
                                        Dr.{option.FirstName} {option.LastName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <Button onClick={this.handleSpecialistAdd}>
                            Add Specialist
                        </Button>
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

AddSpecialistReccomendation.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(AddSpecialistReccomendation);



  //Split show and add for Prescription and Diagnosis