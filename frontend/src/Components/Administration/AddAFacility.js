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


class AddAFacility extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            States: [],
            openForm: false,
            Administrators:[],
            AdminID:"",
            FacilityName:"",
            Street:"",
            City:"",
            StateID:"",
            ZipCode:"",

        };
        this.handleChange=this.handleChange.bind(this);
        this.AddFacility=this.AddFacility.bind(this);
    }
    componentDidMount(){
        this.fetchStates();
        this.fetchAdministrators();
    }
    fetchStates(){
        fetch(`http://162.243.165.50:4000/states`)
        .then(result => result.json())
        .then(Response => this.setState({ States:Response.data }))
        .catch(err => console.log(err))
    }
    fetchAdministrators(){
        fetch(`http://162.243.165.50:4000/Administrators`)
        .then(result => result.json())
        .then(Response => this.setState({ Administrators:Response.data }))
        .catch(err => console.log(err))
    }
    AddFacility(){
        this.setState({openForm: false})
        fetch(`http://162.243.165.50:4000/AddFacility`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                Admin: this.state.AdminID,
                FName:   this.state.FacilityName,
                Street:  this.props.Street,
                City:     this.state.City,
                StateID:     this.state.StateID,
                ZipCode:    this.state.ZipCode
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
            States: [],
            openForm: false,
            Administrators:[],
            AdminID:"",
            FacilityName:"",
            Street:"",
            City:"",
            StateID:"",
            ZipCode:"",
        });
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" fullWidth className={classes.Button} onClick={this.handleClickOpen}>
                    Add A New Facility
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Add A New Facility</DialogTitle>
                    <DialogContent>
                        <FormControl margin="auto" fullWidth required>
                            <InputLabel htmlFor="FacilityName">Facility Name</InputLabel>
                            <Input name="FacilityName" autoFocus value={this.state.FacilityName} onChange={this.handleChange}></Input>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="AdminID"
                                        select
                                        label="Administrator"
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
                        <FormControl margin="auto" fullWidth required>
                            <InputLabel htmlFor="Street">Street Address</InputLabel>
                            <Input name="Street" value={this.state.Street} onChange={this.handleChange}></Input>
                        </FormControl>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={5}>
                                <FormControl margin="normal" fullWidth required>
                                    <InputLabel htmlFor="City">City</InputLabel>
                                    <Input name="City" value={this.state.City} onChange={this.handleChange}></Input>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="State"
                                        select
                                        label="State"
                                        name="StateID"
                                        variant="standard"
                                        value={this.state.StateID} 
                                        onChange={this.handleChange}  
                                        required                   
                                    >
                                        {this.state.States.map(option => (
                                            <MenuItem key={option.StateID} value={option.StateID}>
                                                {option.StateString}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl margin="normal" fullWidth required>
                                    <InputLabel htmlFor="ZipCode">Zip Code</InputLabel>
                                    <Input name="ZipCode"  value={this.state.ZipCode} onChange={this.handleChange}></Input>
                                </FormControl>
                            </Grid>
                        </Grid>           
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.AddFacility} color="primary">
                            Add The Facility
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

AddAFacility.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AddAFacility);
