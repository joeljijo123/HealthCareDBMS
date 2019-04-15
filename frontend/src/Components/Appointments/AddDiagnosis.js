import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
});

class AddDiagnosis extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            AppointmentID: this.props.AppID,
            Diagnosis: "",
            openForm: false,
        };
    }

    handleDiagnosisAdd= () =>{
        this.setState({openForm:false});
        fetch(`http://162.243.165.50:4000/AddDiagnosis`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                AppointmentID: this.state.AppointmentID,
                Diagnosis:   this.state.Diagnosis,
            })
        })
        .catch(err => console.log(err));
    };
    handleClickOpen = () => {
        this.setState({ 
            Diagnosis: "",
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
                    Add a Diagnosis
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Add A Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information to add a new Diagnosis
                        </DialogContentText>
                        <TextField 
                            name="Diagnosis"
                            label="What is the Diagnosis" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Diagnosis}
                            inputProps={{ maxLength: 45 }}
                            fullWidth
                        />
                        <Button onClick={this.handleDiagnosisAdd} disabled={this.state.Diagnosis=== ""}>
                            Add Diagnosis
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

AddDiagnosis.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(AddDiagnosis);



  //Split show and add for Prescription and Diagnosis