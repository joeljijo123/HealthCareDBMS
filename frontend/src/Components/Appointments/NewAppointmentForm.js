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
import AddButton from '@material-ui/icons/ControlPointOutlined';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    icon: {
      fontSize: 25,
      color: "#f5f5f5",
      '&:hover': {
        color: '#e0e0e0',
      },
    },
    Button: {
        marginTop: ".5%"
    }
});

class NewAppointmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            step: 0,
            FacilityID: "",
            DoctorID: "",
            AppointmentTimeID:"",
            Facilities: [],
            Doctors: [],
            AppointmentTimes: [],
            Reason: null,
            AppointmentDate: null,
            DBFormattedDate: null,
        };
        this.uploadDoctors=this.uploadDoctors.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            AppointmentTimes: [{
                TimeSlotID: -1,
                AppointmentTime: "No Appointment Times for the chosen Date"
            }]
        })
        this.uploadFacilities();
    };

    handleClickOpen = () => {
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.uploadFacilities();
        this.setState({ 
            openForm: false,
            step: 0,
            FacilityID: "",
            DoctorID: "",
            AppointmentTimeID:"",
            Facilities: [],
            Doctors: [],
            AppointmentTimes: [],
            Reason: null,
            AppointmentDate: null,
            DBFormattedDate: null,
        });
    };

    AppointmentDateChange = (d) =>{
        let ApptDate=new Date(d)
        ApptDate = this.FormatDate(ApptDate);
        this.setState({DBFormattedDate:ApptDate});
        this.setState({
            AppointmentDate: d
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

    getStepInfo(step){
        switch(step){
            case 0:
                return (<div>
                            <WhichFacility val={this.state} handleChange={this.handleChange}/>
                            <Button onClick={this.handleNextStep} disabled={this.state.FacilityID===""} color="primary">
                                Next
                            </Button>
                        </div>)
            case 1:
            
                return (<div>
                            <WhichDoctor val={this.state} handleChange={this.handleChange}  AppointmentDateChange={this.AppointmentDateChange}/>
                            <Button onClick={this.handleBackStep} color="primary">
                                Back
                            </Button>
                            <Button onClick={this.handleNextStep} disabled={this.state.DoctorID==="" || this.state.AppointmentDate===""} color="primary">
                                Next
                            </Button>
                        </div>)
            case 2:
                
                return (<div>
                            <CompleteNewAppointment  val={this.state} AppointmentDateChange={this.AppointmentDateChange} handleChange={this.handleChange}/>
                            <Button onClick={this.handleBackStep} color="primary">
                                Back
                            </Button>
                            <Button onClick={this.handleSubmit} disabled={this.state.AppointmentTimeID=== "" || this.state.AppointmentTimeID=== -1} color="primary">
                                Submit
                            </Button>

                        </div>) 
            default:
                return "Cannot Find Appointment Step"
        }
    };
    uploadFacilities=()=> {
        fetch(`http://162.243.165.50:4000/Facilities`)
        .then(result => result.json())
        .then(Response => this.setState({ Facilities:Response.data }))
        .catch(err => console.log(err))
    };
    uploadDoctors=()=> {
        var Specialist="1";//0 is false and 1 is true
        if(window.localStorage.userType !== "3"){
            Specialist="0";
        }
        fetch(`http://162.243.165.50:4000/Doctors/${this.state.FacilityID}/${Specialist}`)
        .then(result => result.json())
        .then(Response => this.setState({ Doctors:Response.data }))
        .catch(err => console.log(err))
    };
    uploadTimes=()=> {
        fetch(`http://162.243.165.50:4000/AppointmentTimes/`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                DoctorID: this.state.DoctorID,
                FacilityID: this.state.FacilityID,
                AppDate: this.state.DBFormattedDate,
            })
        })
        .then(result => result.json())
        .then(Response => 
            {if(Response.data.length !== 0) {
                this.setState({ AppointmentTimes:Response.data})
            }})
        .catch(err => console.log(err));
    };
    handleNextStep= () =>{
        this.uploadDoctors();
        this.uploadTimes();
        this.setState({step: this.state.step+1})
    };
    handleSubmit= () =>{
        this.setState({openForm:false})
        fetch(`http://162.243.165.50:4000/AddAppointment`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                FacilityID: this.state.FacilityID,
                DoctorID:   this.state.DoctorID,
                PatientID:  this.props.PatientID,
                Reason:     this.state.Reason,
                TimeID:     this.state.AppointmentTimeID,
                AppDate:    this.state.DBFormattedDate
            })
        })
        .catch(err => console.log(err))
        //.then(window.location.replace('/Appointments'));
        setTimeout(function(){
            window.location.replace('/Appointments')
        }, 200);
    };
    handleBackStep= () =>{
        this.setState({
            step: this.state.step-1,
            AppointmentTimeID: ""
        })
    };
    render(){
        const {classes}=this.props;
        return(
            <div>
                {window.localStorage.userType === "2" ? (
                    <Button variant="filled" fullWidth className={classes.Button} onClick={this.handleClickOpen}>
                        <AddButton className={classes.icon}/>New Appointment
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" fullWidth disabled={this.props.PatientID === -1} className={classes.Button} onClick={this.handleClickOpen}>
                        <AddButton className={classes.icon}/>New Appointment
                    </Button>
                )}
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Book an Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information to add a new Appointment
                        </DialogContentText>
                        {this.getStepInfo(this.state.step)}
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

NewAppointmentForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(NewAppointmentForm);