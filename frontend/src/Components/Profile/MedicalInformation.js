import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, MenuItem, FormControl, Button, Grid, Divider} from '@material-ui/core';
import AddImmunizationForm from '../MedicalInfoForm/AddImmunizationForm';

//Define the looks
const styles = theme => ({
  root: {
    width: '75%',
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
      open: true,
      patientID: '',
      createdAt: '',
      lastUpdatedAt: '',
      createdByEmployeeID: '',
      lastUpdatedBy: '',
      allergies: '',
      majorIllness: '',
      bloodType: '',
      procedureRecord: '',
      medicalCondition: '',
    };
  }

componentDidMount(){
  this.getMedicalHistoryData();
};

getMedicalHistoryData(){
  fetch('https://localhost:3000/MedicalHistory')
  .then(response => response.json())
  .then(response => this.setState({
    immunizationRecord: response.data,
    medicationRecord: response.data,
  }))
  .catch(err => console.error(err))
};

openedImmuneForm = ({handleClickOpen}) => {
  this.openImmForm = handleClickOpen;
}

  render() {
    const {classes, addImmunizationForm} = this.props;

    return (
      <div>
          <Paper className={classes.root} elevation={2}>
              <Typography variant="h3" >Patient Medical Record</Typography>
              <br />
              <Typography variant="h4" >Summary</Typography>
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
              <br/>
              <Grid container spacing={24}>
                <Grid item sm>
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
                  fullWidth
                  rows="8"
                />
              </Grid>
                <Grid item sm>
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
                  fullWidth
                  rows="8"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item sm>
                <TextField 
                  id="outlined-allergies"
                  label="Allergies"
                  className={classes.textField}
                  value={this.state.allergies}
                  margine="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                />
              </Grid>
                <Grid item sm>
                  <TextField 
                  id="outlined-prodecuresRecord"
                  label="Procedures Record"
                  className={classes.textField}
                  value={this.state.procedureRecord}
                  margine="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                  <Grid item sm>
                    <TextField 
                    id="outlined-medicalCondition"
                    label="Medical Condition"
                    className={classes.textField}
                    value={this.state.medicalCondition}
                    margine="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    multiline
                    variant="outlined"
                    fullWidth
                    rows="8"
                    />
                  </Grid>
              </Grid>
              <Grid>
                <Button variant="contained" color="primary" className={classes.button}> Edit </Button>
                <AddImmunizationForm Button={classes.button}/>
              </Grid>
              <Divider variant="middle"/>
          </Paper>
      </div>
    );
  }
}

MedicalInformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedicalInformation);
