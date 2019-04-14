import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/ChromeReaderMode';
import { withStyles, Typography } from '@material-ui/core';
import {Paper, TextField, Grid,} from '@material-ui/core';

import PropTypes from 'prop-types';

const styles = theme => ({
    icon: {
      fontSize: 25,
      color: "#f5f5f5",
      '&:hover': {
        color: '#e0e0e0',
      },
    },
    dialog: {
        margin: 'normal',
    },
    Button: {
        marginTop: ".5%"
    },
    root: {
        width: '100%',
        backgroundColor: "#e0e0e0",
        padding: theme.spacing.unit*15,
        height: '100%',
        margin:"auto",
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

class PatientMedicalHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,    
            editing: false,   
            allergies: '',
            immunizationRecord: '',
            medicalCondition: '',
            procedureRecord: '',
        };
        this.handleChange=this.handleChange.bind(this);
        this.saveChange=this.saveChange.bind(this);
    }
    getMedicalRecord=()=>{
        fetch(`http://157.230.214.92:4000/GetMedicalHistory/${this.props.PatientID}`)
        .then(result => result.json())
        .then(result => 
            {if(result.data.length !== 0){
                this.setState({
                    allergies: result.data[0].Allergies,
                    immunizationRecord: result.data[0].ImmunizationRecord,
                    medicalCondition: result.data[0].MedicalCondition,
                    procedureRecord: result.data[0].ProcedureRecord,
                })
            }})
        .catch(err => console.error(err))
    };
    updateMedicalRecord(){
        fetch(`http://157.230.214.92:4000/UpdateMedicalHistory`, {
          method:"POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            patientID: this.props.PatientID,
            lastUpdatedBy: window.localStorage.userID,
            immunizationRecord: this.state.immunizationRecord,
            allergies: this.state.allergies,
            procedureRecord: this.state.procedureRecord,
            medicalCondition: this.state.medicalCondition,
          })
        })
        .then(this.getMedicalRecord())
        .catch(err => console.log(err))
    }
    saveChange(){
        this.updateMedicalRecord();
        this.getMedicalRecord();
        this.setState({
            editing: false
        });
    }
    handleClickOpen = () => {
        this.getMedicalRecord();
        this.setState({openForm:true})
    };
    handleClose = () => {
        this.setState({ 
            openForm: false,    
            editing: false,   
            allergies: '',
            immunizationRecord: '',
            medicalCondition: '',
            procedureRecord: '',
        });
    };
    editMode = () => {
        this.setState({
          editing: true
        });
    }
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    render(){
        const {classes}=this.props;
        return(
            <div>
                <Button variant="contained" color="inherit" className={this.props.Button} onClick={this.handleClickOpen} fullWidth >
                    <InfoIcon/> Patient's Medical History
                </Button>
                <Dialog fullScreen className={classes.dialog} open={this.state.openForm} onClose={this.handleClose}>
                    <Paper className={classes.root} elevation={2}>
                        <Typography variant="h3" >Patient Medical Record</Typography>
                        <br />
                        <Typography variant="h4" >Summary</Typography>
                        <TextField
                            label="Patient ID"
                            margin="normal"
                            disabled
                            className={classes.textField}
                            value={this.props.PatientID}
                        />
                        <br/>
                        <Grid container spacing={24}>
                            <Grid item sm>
                                <TextField
                                    name="immunizationRecord"
                                    label="Immunization Record"
                                    className={classes.textField}
                                    value={this.state.immunizationRecord}
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    rows="8"
                                    inputProps={{ maxLength: 45 }}
                                    disabled={!this.state.editing}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item sm>
                                <TextField
                                    name="medicalCondition"
                                    label="Medical Condition"
                                    className={classes.textField}
                                    value={this.state.medicalCondition}
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    rows="8"
                                    inputProps={{ maxLength: 45 }}
                                    disabled={!this.state.editing}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={24}>
                            <Grid item sm>
                                <TextField
                                    name="allergies"
                                    label="Allergies"
                                    className={classes.textField}
                                    value={this.state.allergies}
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    rows="8"
                                    inputProps={{ maxLength: 45 }}
                                    disabled={!this.state.editing}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item sm>
                                <TextField
                                    name="procedureRecord"
                                    label="Procedures Record"
                                    className={classes.textField}
                                    value={this.state.procedureRecord}
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    rows="8"
                                    inputProps={{ maxLength: 100 }}
                                    disabled={!this.state.editing}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid>
                            {!this.state.editing ? (
                                <div>
                                        <Button variant="contained" color="primary" fullWidth className={classes.button} onClick={this.editMode}> Edit </Button>
                                </div>
                            ):(
                                <div>
                                    <Button variant="contained" color="secondary" fullWidth className={classes.button} onClick={this.saveChange}> Save </Button>
                                </div>      
                            )}
                            <Button variant="contained" color="primary" fullWidth className={classes.button} onClick={this.handleClose}> Close </Button>

                        </Grid>
                    </Paper>
                </Dialog>
            </div>
        );
    }
    
}

PatientMedicalHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(PatientMedicalHistory);