import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { OutlinedInput, withStyles } from '@material-ui/core';

//Define the looks
const styles = theme => ({
    textField:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
});


class AddImmunizationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            dateAdministered: '',
            vacineType: '',
            administeredBy: '',
            facility: '',
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    render(){
        const {classes} = this.props
        return(
        <div>
            {console.log("Test Button")}
            <Button variant="contained" color="primary" className={this.props.Button} onClick={this.handleClickOpen}>Add</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-addImmunization">Immunization Record Form</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Add immunization record
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="dateAdministered"
                className={classNames.textField}
                value={this.state.dateAdministered}
                label="Date Administered"
                type="Date"
                />
                <br />
                <TextField
                autoFocus
                margin="dense"
                id="vacineType"
                label = "Vaccine Type"
                className={classNames.textField}
                value={this.state.vacineType}
                label="Vacine Type"
                fullWidth
                multiline
                rows = "4"
                rowsMax = "4"
                variant = "outlined"
                />
                <br />
                <TextField
                autoFocus
                margin="dense"
                id="administeredBy"
                className={classNames.textField}
                value={this.state.administeredBy}
                label="Administered By"
                />
                <TextField
                autoFocus
                margin="dense"
                id="facility"
                className={classNames.textField}
                value={this.state.facility}
                label="Facility"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancle
            </Button>
          </DialogActions>
        </Dialog>
        </div>
        );
    }
}

AddImmunizationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddImmunizationForm);