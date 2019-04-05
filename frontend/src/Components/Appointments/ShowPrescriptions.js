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

class ShowPrescriptions extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            Prescriptions: [],
        };
    }
    componentDidMount(){
        this.uploadPrescriptions();
    }
    uploadPrescriptions(){
        fetch(`http://157.230.214.92:4000/Prescriptions/${this.props.AppID}`)
        .then(result => result.json())
        .then(Response => this.setState({ Prescriptions: Response.data }))
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
                    Show Prescriptions
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Here are your issued Prescriptions</DialogTitle>
                    <DialogContent>
                        {this.state.Prescriptions.length>=1 ? (
                            <div>
                                 <DialogContentText>
                                    These are the Prescriptions Assosciated with your Appointment
                                </DialogContentText>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Prescription Issue ID</TableCell>
                                            <TableCell align="right">Refills</TableCell>
                                            <TableCell align="right">Due Date</TableCell>
                                            <TableCell align="right">Medicine</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.Prescriptions.map(Each => (
                                            <TableRow key={Each.PrescriptionIssueID}>
                                            <TableCell component="th" scope="row">
                                                {Each.PrescriptionIssueID}
                                            </TableCell>
                                            <TableCell align="right">{Each.RefillLeft}</TableCell>
                                            <TableCell align="right">{Each.DueDate.substr(0,10)}</TableCell>
                                            <TableCell align="right">{Each.Medicine}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ):(
                            <DialogContentText>
                                There are no Prescriptions Assosciated with your Appointment
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

ShowPrescriptions.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(ShowPrescriptions);
                 