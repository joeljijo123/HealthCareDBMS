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

class AddSpecialistReccomendation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            AppointmentID: this.props.AppID,
            Specialist: "",
            openForm: false,
        };
    }

    handleSpecialistAdd= () =>{
        this.setState({openForm:false});
        fetch(`http://157.230.214.92:4000/AddSpecialist`, {
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
        const {classes}=this.props;
        return(
            <div>
                <Button variant="contained" color="primary" fullWidth className={this.props.Button} onClick={this.handleClickOpen}>
                    Add a Specialist Reccomendation
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Add A Specialist Reccomendation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Type in the name of the Specialist you would like to Reccomend, Leave blank if you would like to remove the Reccomendation
                        </DialogContentText>
                        <TextField 
                            name="Specialist"
                            label="Reccomended Specialist" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Specialist}
                            inputProps={{ maxLength: 45 }}
                            fullWidth
                        />
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