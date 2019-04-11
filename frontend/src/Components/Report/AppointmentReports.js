import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
    root: {
        width: '75%',
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    page: {
        height: "100vh",
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    AdditionButton: {
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
  
    },
    Button: {
        marginTop: '.5%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '20%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '100%',
        margin: 'auto'
      },
});


class AppointmentReports extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ChosenFacility: "",
            ChosenDoctor: "",
            MinimumDate: "",
            MaximumDate: "",
            Doctors: [],
            Facilities: [],

        };
    }
    componentDidMount(){
        this.uploadDoctors();
        this.uploadFacilities();
    }
    uploadDoctors(){

    }
    uploadFacilities(){
        fetch(`http://157.230.214.92:4000/Facilities`)
        .then(result => result.json())
        .then(Response => this.setState({ Facilities:Response.data }))
        .catch(err => console.log(err))
    }
    render(){
        const classes = this.props;
        return(
            <div className = {classes.page}>
                <Button variant="contained" color="inherit" className={this.props.Button} fullWidth onClick={this.handleClickOpen}>
                    ShowReport Diagnosis
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Here are the Doctor's Diagnoses</DialogTitle>
                    <DialogContent>
                        {this.state.Diagnosis.length>=1 ? (
                            <div>
                                <DialogContentText>
                                    These are the Diagnoses Assosciated with your Appointment
                                </DialogContentText>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Diagnosis</TableCell>
                                            <TableCell align="right">DiagnosisID</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.Diagnosis.map(Each => (
                                            <TableRow key={Each.DiagnosisID}>
                                            <TableCell component="th" scope="row">
                                                {Each.Diagnosis}
                                            </TableCell>
                                            <TableCell align="right">{Each.DiagnosisID}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ):(
                            <DialogContentText>
                                There are no Diagnoses Assosciated with your Appointment
                            </DialogContentText>
                        )}
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

AppointmentReports.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AppointmentReports);
