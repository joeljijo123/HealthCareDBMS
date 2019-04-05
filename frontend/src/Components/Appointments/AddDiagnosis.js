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

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
});

class AddDiagnosis extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            AppointmentID: this.props.AppID,
            Diagnosis: "",
            PrescriptionID: "",
            DiagnosisID: "",
            Refills:"",
            Prescriptions: [],
            Reason: null,
            DueDate: null,
            DBDueDate: null,
        };
    }

    componentDidMount = () => {

    };

    handleClickOpen = () => {
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };

    DueDateChange = (d) =>{
        let DueDate=new Date(d)
        DueDate = this.FormatDate(DueDate);
        this.setState({DBDueDate:DueDate});
        this.setState({
            DueDate: d
        })
    }

    FormatDate=(date)=>{
        date = date.getFullYear() + '-' + (this.fixMonth(date)) + '-' + date.getDate();
        return date;
    }

    fixMonth=(date)=>{
        if(date.getMonth() + 1 < 10){
            return "0" +(date.getMonth() +1);
        }
        else{
            return date.getMonth()+1;
        }
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
                <Button variant="raised" color="primary" fullWidth className={this.props.Button} onClick={this.handleClickOpen}>
                    Add a Diagnosis
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Book an Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information to add a new Appointment
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

AddDiagnosis.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(AddDiagnosis);