import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/ChromeReaderMode';
import { withStyles, Typography } from '@material-ui/core';
import {Paper, TextField, Grid,} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import './AppointmentPage.css';

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
        padding: theme.spacing.unit*6,
        minHeight: '100vh',
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
    table: {
        height: 10,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: '3',
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
            MHLog: [],
            deduct: "",
            insuranceID: "",
            insuranceContact: "",
            company: "",
        };
        this.handleChange=this.handleChange.bind(this);
        this.saveChange=this.saveChange.bind(this);
    }
    componentDidMount(){
        this.getInsurance();
        this.getLog();
    }
    getMedicalRecord=()=>{
        fetch(`http://162.243.165.50:4000/GetMedicalHistory/${this.props.PatientID}`)
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
    getLog=()=>{
        fetch(`http://162.243.165.50:4000/GetMedicalHistoryLog/${this.props.PatientID}`)
        .then(result => result.json())
        .then(result => this.setState({
            MHLog: result.data
        }))
        .catch(err => console.error(err))
    };
    getInsurance(){
            fetch(`http://162.243.165.50:4000/Insurance/${this.props.PatientID}`)
            .then(result => result.json())
            .then(res => this.setState({
                deduct:res.data[0].Deductible,
                insuranceID: res.data[0].InsuranceClientID,
                insuranceContact: res.data[0].ContactNumber,
                company: res.data[0].Name,

            }))
            .catch(err => console.log(err))
}
    updateMedicalRecord(){
        fetch(`http://162.243.165.50:4000/UpdateMedicalHistory`, {
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
        console.log(this.state.MHLog)
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
                {this.getMedicalRecord}
                <Button variant="contained" color="inherit" className={this.props.Button} onClick={this.handleClickOpen} fullWidth >
                    <InfoIcon/> Patient's Information
                </Button>
                <Dialog fullScreen className={classes.dialog} open={this.state.openForm} onClose={this.handleClose}>
                    <Paper className={classes.root} fullWidth elevation={2}>
                        <Typography variant="h3" >Here are the Patients Information</Typography>
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
                                    rows="2"
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
                                    rows="2"
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
                                    rows="2"
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
                                    rows="2"
                                    inputProps={{ maxLength: 100 }}
                                    disabled={!this.state.editing}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Table>
                            <TableHead>
                                <TableRow display={'flex'}>
                                    <TableCell align="center">Medical History Last Updated On</TableCell>
                                    <TableCell align="center">Medical History Last Updated By (EmployeeID)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.MHLog.map(Each => (
                                    <TableRow key={Each.UpdatedAt}>
                                        <TableCell align="center">{Each.UpdatedAt.substr(0,10)}</TableCell>
                                        <TableCell align="center">{Each.UpdatedBy}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>    
                        <Grid container spacing={24}>
                            <Grid item sm>
                                <TextField
                                    name="company"
                                    label="Insurance Company"
                                    className={classes.textField}
                                    value={this.state.company}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item sm>
                                <TextField
                                    name="insuranceContact"
                                    label="Insurance Number"
                                    className={classes.textField}
                                    value={this.state.insuranceContact}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item sm>
                                <TextField
                                    name="insuranceID"
                                    label="Insurance Client ID"
                                    className={classes.textField}
                                    value={this.state.insuranceID}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item sm>
                                <TextField
                                    name="deduct"
                                    label="Deductible Amount"
                                    className={classes.textField}
                                    value={this.state.deduct}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            {!this.state.editing ? (
                                <Grid item xs={12} sm={6}>
                                        <Button variant="contained" fullWidth color="primary" className={classes.button} onClick={this.editMode}> Edit </Button>
                                </Grid>
                            ):(
                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" fullWidth color="secondary" className={classes.button} onClick={this.saveChange}> Save </Button>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" fullWidth color="primary" className={classes.button} onClick={this.handleClose}> Close </Button>
                            </Grid>
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