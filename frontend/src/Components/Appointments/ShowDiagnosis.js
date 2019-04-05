import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import WhichFacility from './WhichFacility';
import WhichDoctor from './WhichDoctor';
import CompleteNewAppointment from './CompleteNewAppointment';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/ThreeSixty';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//Seperate Prescription and Diagnosis Tables

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 800,
      },
});

class ShowDiagnosis extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            Diagnosis: [],
        };
    }
    componentDidMount(){
        this.uploadDiagnosis();
    }
    uploadDiagnosis(){
        fetch(`http://157.230.214.92:4000/Diagnosis/${this.props.AppID}`)
        .then(result => result.json())
        .then(Response => this.setState({ Diagnosis: Response.data }))
        .catch(err => console.log(err))
    }
    handleClickOpen = () => {
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };

    render(){
        const {classes}=this.props;
        return(
            <div>
                <Button variant="raised" color="primary" className={this.props.Button} fullWidth onClick={this.handleClickOpen}>
                    Show Diagnosiis
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

ShowDiagnosis.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(ShowDiagnosis);
                 