import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, Divider, Grid} from '@material-ui/core';



//Define the looks
const styles = theme => ({
  root: {
    width: '75%',
    backgroundColor: "#e0e0e0",
    padding: theme.spacing.unit*3,
    height: '98%',
    margin:"auto",
    marginTop: '2%',
    marginBottom: '2%',
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
      editImmunizationRecord: '',
      editMedicalCondition: '',
      editAllergies: '',
      editProcedureRecord: '',

    };
  }

componentDidMount(){
  this.getMedicalRecord();
};

getMedicalRecord=()=>{
  fetch(`http://162.243.165.50:4000/GetMedicalHistory/${window.localStorage.userID}`)
  .then(result => result.json())
  .then(res => this.setState({
    patientID: res.data[0].PatientID,
    editImmunizationRecord: res.data[0].ImmunizationRecord,
    editMedicalCondition: res.data[0].MedicalCondition,
    editAllergies: res.data[0].Allergies,
    editProcedureRecord: res.data[0].ProcedureRecord
  }))
  .catch(err => console.error(err))
};

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
                disabled
                onChange={this.handleChange}
              />
              <br/>
              <Grid container spacing={24}>
                <Grid item sm>
                <TextField
                  label="Immunization Record"
                  className={classes.textField}
                  value={this.state.editImmunizationRecord}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled
                  onChange={this.handleChangeImmunizationRecord}
                />
              </Grid>
                <Grid item sm>
                  <TextField
                  label="Medical Condition"
                  className={classes.textField}
                  value={this.state.editMedicalCondition}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled
                  onChange={this.handleChangeMedicalCondition}
                  />
                </Grid>
              </Grid>
              
              <Grid container spacing={24}>
                <Grid item sm>
                <TextField
                  label="Allergies"
                  className={classes.textField}
                  value={this.state.editAllergies}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled
                  onChange={this.handleChangeAllergies}
                />
              </Grid>
                <Grid item sm>
                  <TextField
                  label="Procedures Record"
                  className={classes.textField}
                  value={this.state.editProcedureRecord}
                  margine="normal"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="8"
                  disabled
                  onChange={this.handleChangeProcedureRecord}
                  />
                </Grid>
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
