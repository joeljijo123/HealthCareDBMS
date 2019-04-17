import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, FormControl, InputLabel, Input, Grid, TextField, MenuItem,} from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = theme =>({
    Button: {
        marginTop: '2%',
    },
});


class ChangeAFacility extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Facilities: [],
            openForm: false,
            Administrators:[],
            AdminID:"",
            ChosenFacility:"",

        };
        this.handleChange=this.handleChange.bind(this);
        this.ChangeFacility=this.ChangeFacility.bind(this);
    }
    componentDidMount(){
        this.fetchFacilities();
        this.fetchAdministrators();
    }
    fetchFacilities(){
        fetch(`http://162.243.165.50:4000/Facilities`)
        .then(result => result.json())
        .then(Response => this.setState({ Facilities:Response.data }))
        .catch(err => console.log(err))
    }
    fetchAdministrators(){
        fetch(`http://162.243.165.50:4000/Administrators`)
        .then(result => result.json())
        .then(Response => this.setState({ Administrators:Response.data }))
        .catch(err => console.log(err))
    }
    ChangeFacility(){
        this.setState({openForm:false})
        fetch(`http://162.243.165.50:4000/ChangeAdmin`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                AdministratorID: this.state.AdminID,
                FacilityID:   this.state.ChosenFacility,
            })
        })
        .catch(err => console.log(err))
    };
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleClickOpen = () => {
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ 
            Facilities: [],
            openForm: false,
            Administrators:[],
            AdminID:"",
            ChosenFacility:"",
        });
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" fullWidth className={classes.Button} onClick={this.handleClickOpen}>
                    Change A Facility Administrator
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Change Facility Administrator</DialogTitle>
                    <DialogContent>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="ChosenFacility"
                                select
                                label="Select Facility"
                                name="ChosenFacility"
                                variant="standard"
                                value={this.state.ChosenFacility} 
                                onChange={this.handleChange}  
                                required                   
                            >
                                {this.state.Facilities.map(option => (
                                    <MenuItem key={option.FacilityID} value={option.FacilityID}>
                                        {option.FacilityID}: {option.FacilityName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="AdminID"
                                select
                                label="Select New Admin"
                                name="AdminID"
                                variant="standard"
                                value={this.state.AdminID} 
                                onChange={this.handleChange}  
                                required                   
                            >
                                {this.state.Administrators.map(option => (
                                    <MenuItem key={option.EmployeeID} value={option.EmployeeID}>
                                        {option.EmployeeID}:{option.FirstName} {option.LastName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.ChangeFacility} disabled={this.state.AdminID === "" || this.state.ChosenFacility === ""} color="primary">
                            Change Facility Admin 
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

ChangeAFacility.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ChangeAFacility);
