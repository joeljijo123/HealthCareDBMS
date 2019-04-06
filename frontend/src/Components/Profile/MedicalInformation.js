import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, MenuItem, FormControl, Button, Grid} from '@material-ui/core';

//Define the looks
const styles = theme => ({
  root: {
    width: '75%',
    display: "flex",
    backgroundColor: "#e0e0e0",
    padding: theme.spacing.unit*3,
    height: '98%',
    margin:"auto",
    marginTop: '2%',
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
    immunizationRecord: response.data,
    medicationRecord: response.data,
  }))
  .catch(err => console.error(err))
}

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="h3" gutterBottom>Patient Medical Record</Typography>
          <Typography variant="h4" gutterBottom>Summary</Typography>
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
          
          <Grid item xs={6}>
            <TextField 
            id="outlined-immunizationRecord"
            label="Immunization Record"
            className={classes.textField}
            value={this.state.immunizationRecord}
            margine="normal"
            InputProps={{
              readOnly: true,
            }}
            multiline
            variant="outlined"
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField 
            id="outlined-medicationRecord"
            label="Medication Record"
            className={classes.textField}
            value={this.state.medicationRecord}
            margine="normal"
            InputProps={{
              readOnly: true,
            }}
            multiline
            variant="outlined"
            />
          </Grid>


          <Grid item xs={6}>
            <Button variant="containted" color="primary" className={classes.button}> Edit </Button>
          </Grid>
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
