import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, MenuItem, FormControl, Button, Grid, Divider, table} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';


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
    super(props)
    this.state = {
      patientID: '',
      /*
      createdAt: '',
      lastUpdatedAt: '',
      createdByEmployeeID: '',
      lastUpdatedBy: '',
      */
      immunizationRecord: '',
      medicalCondition: '',
      allergies: '',
      procedureRecord: '',

      editing: false
    };
    this.handleChange=this.handleChange.bind(this);
  }

componentDidMount(){
  this.getMedicalRecord();
};

getMedicalRecord=()=>{
  fetch(`http://157.230.214.92:4000/GetMedicalHistory/${window.localStorage.userID}`)
  .then(result => result.json())
  .then(res => this.setState({
    patientID: res.data[0].PatientID,
    /*
    createdAt: res.data[0].createdAt,
    lastUpdatedAt: res.data[0].lastUpdatedAt,
    createdByEmployeeID: res.data[0].createdByEmployeeID,
    lastUpdatedBy: res.data[0].lastUpdatedBy,
    */
    immunizationRecord: res.data[0].ImmunizationRecord,
    medicalCondition: res.data[0].MedicalCondition,
    allergies: res.data[0].Allergies,
    procedureRecord: res.data[0].ProcedureRecord,
  }))
  .catch(err => console.error(err))
};

updateMedicalRecord=()=>{
  fetch(`http://157.230.214.92:4000/UpdateMedicalHistory`, {
    method:"POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify({
    patientID: window.localStorage.patientID,
    /*
    createdAt: this.state.createdAt,
    lastUpdatedAt: this.state.lastUpdatedAt,
    createdByEmployeeID: this.state.createdByEmployeeID,
    lastUpdatedBy: this.state.lastUpdatedBy,
    */
    immunizationRecord: this.state.immunizationRecord,
    medicationRecord: this.state.medicationRecord,
    allergies: this.state.allergies,
    procedureRecord: this.state.procedureRecord,
    medicalCondition: this.state.medicalCondition,
    })
  })
  .catch(err => console.log(err))
}

handleChange = e =>{
  this.setState({
    [e.target.name] : e.target.value
  });
}

editMode = _ => {
  this.setState({
    editing: true
  });
}

saveChange = _ => {
  this.updateMedicalRecord();
  this.getMedicalRecord();
  this.setState({
    editing: false
  });
}

revertChanges = _ => {
  this.getMedicalRecord();
  this.setState({
    editing: false
  });
}

  render() {
    const {classes} = this.props;
    return (
      <div>
          <Paper className={classes.root} elevation={2}>
              <Typography variant="h3" >Patient Medical Record</Typography>
              <br />
              <Typography variant="h4" >Summary</Typography>
              <TextField
                label="Patient ID"
                margin="normal"
                className={classes.textField}
                value={this.state.patientID}
                disabled={!this.state.editing} 
                onChange={this.handleChange}
              />
              <br/>
              <Grid container spacing={24}>
                <Grid item sm>
                <TextField
                  label="Immunization Record"
                  className={classes.textField}
                  value={this.state.immunizationRecord}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled={!this.state.editing}
                  onChange={this.handleChange}
                />
              </Grid>
                <Grid item sm>
                  <TextField
                  label="Medical Condition"
                  className={classes.textField}
                  value={this.state.medicalCondition}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled={!this.state.editing}
                  onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              
              <Grid container spacing={24}>
                <Grid item sm>
                <TextField
                  label="Allergies"
                  className={classes.textField}
                  value={this.state.allergies}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled={!this.state.editing}
                  onChange={this.handleChange}
                />
              </Grid>
                <Grid item sm>
                  <TextField
                  label="Procedures Record"
                  className={classes.textField}
                  value={this.state.procedureRecord}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled={!this.state.editing}
                  onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid>
                  {!this.state.editing ? (
                <div>
                  {this.getMedicalRecord}
                <FormControl margin="none">
                  <Button variant="contained" color="primary" className={classes.button} onClick={this.editMode}> Edit </Button>
                </FormControl>
                </div>
                  ):(
                <div>
                  <FormControl margin="right">
                  <Button variant="contained" color="primary" className={classes.button} onClick={this.saveChange}> Save </Button>
                  </FormControl>
                  <FormControl margin="left">
                  <Button variant="contained" color="primary" className={classes.button} onClick={this.revertChanges}> Revert </Button>
                  </FormControl>
                </div>      
                  )}
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
