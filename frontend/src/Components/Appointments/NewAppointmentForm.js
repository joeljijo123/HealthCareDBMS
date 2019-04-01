import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import WhichFacility from './WhichFacility';
import WhichDoctor from './WhichDoctor';
import CompleteNewAppointment from './CompleteNewAppointment';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = theme => ({
    paperForm: {
        width: '25%',
        marginLeft: '7%',
        marginTop: '-15%',
        padding: theme.spacing.unit*2,
        flexDirection: 'column',
        backgroundColor: "#e0e0e0",
    },
});

class NewAppointmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            step: 0,
            FacilityID: null,
            DoctorID: null,
            Facilities: [],
            Doctors: [],
        };
    }

    componentDidMount = () => {
        this.uploadFacilities();
    };

    handleClickOpen = () => {
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };

    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getStepInfo(step){
        switch(step){
            case 0:
                return <WhichFacility val={this.state} handleChange={this.handleChange}/>
            case 1:
                this.uploadDoctors();
                return <WhichDoctor val={this.state} handleChange={this.handleChange}/>
            case 2:
                return <CompleteNewAppointment  val={this.state} handleChange={this.handleChange}/>
            default:
                return "Cannot Find Appointment Step"
        }
    };
    uploadFacilities=()=> {
        fetch(`http://157.230.214.92:4000/Facilities`)
        .then(result => result.json())
        .then(Response => this.setState({ Facilities:Response.data }))
        .catch(err => console.log(err))
    };
    uploadDoctors=()=> {
        fetch(`http://157.230.214.92:4000/Doctors/${this.state.FacilityID}`)
        .then(result => result.json())
        .then(Response => this.setState({ Doctors:Response.data }))
        .catch(err => console.log(err))
    };
    handleNextStep= () =>{
        this.setState({step: this.state.step+1})
    };
    handleSubmit= () =>{
        window.location.replace('/Appointments');
        
    };
    handleBackStep= () =>{
        this.setState({step: this.state.step-1})
    };
    render(){
        // const {classes}=this.props;
        return(
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add New Appointment
                </Button>
                <Dialog marginTop='5%' open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Book an Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information to add a new Appointment
                        </DialogContentText>
                        {this.getStepInfo(this.state.step)}
                    </DialogContent>
                    <DialogActions>
                        {this.state.step !== 0 ? (
                            <Button onClick={this.handleBackStep} color="primary">
                                Back
                            </Button>
                        ):(
                            <div/>
                        )}
                        <Button onClick={this.handleNextStep} color="primary">
                            Next
                        </Button>
                        {this.state.step === 2 ? (
                            <Button onClick={this.handleSubmit} color="primary">
                                Submit
                            </Button>
                        ):(
                            <div/>
                        )}
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

NewAppointmentForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NewAppointmentForm);