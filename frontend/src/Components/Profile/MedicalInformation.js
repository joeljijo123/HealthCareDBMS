import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, MenuItem, FormControl, Button} from '@material-ui/core';

//Define the looks
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class MedicalInformation extends Component {
  constructor(props){
    super(props);
    this.state = {
      patientID: '',
      createdAt: '',
      lastUpdatedAt: '',
      createdByEmployeeID: '',
      lastUpdatedBy: '',
      allergies: '',
      majorIllness: '',
      bloodType: '',
    };
  }

componentDidMount(){
  this.getMedicalHistoryData();
}

getMedicalHistoryData(){
  fetch('https://localhost:3000/MedicalHistory')
  .then(response => response.json())
  .then(response => this.setState({
    patientID: response.data, 
    createAt: response.data,
    lastUpdatedAt: response.data,
    createdByEmployeeID: response.data,
    lastUpdatedBy: response.data,
    allergies: response.data,
    majorIllness: response.data,
    bloodType: response.data,
  }))
  .catch(err => console.error(err))
}

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="h3" gutterBottom>Patient Medical Record</Typography>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-patientID"
              label="Patient ID"
              className={classes.textField}
              value={this.state.patientID}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            
            <TextField
              id="standard-allergies"
              label="Allergies"
              className={classes.textField}
              value={this.state.allergies}
              margin="normal"
              variant="outlined"
              multiline
              rows="4"
            />

            <TextField
              id="standard-majorIllness"
              label="Major Illnesses"
              className={classes.textField}
              value={this.state.majorIllness}
              margin="normal"
              variant="outlined"
              multiline
              rows="4"
            />

            <TextField
              id="standard-bloodType"
              label="Blood Type"
              className={classes.textField}
              value={this.state.bloodType}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              id="standard-createdAt"
              label="Created At"
              className={classes.textField}
              value={this.state.createdAt}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="standard-lastUpdated"
              label="Last Updated"
              className={classes.textField}
              value={this.state.lastUpdatedAt}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="standard-createdBy"
              label="Created By"
              className={classes.textField}
              value={this.state.createdByEmployeeID}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            <Button variant="containted" color="primary" className={classes.button}> Edit </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

MedicalInformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedicalInformation);
