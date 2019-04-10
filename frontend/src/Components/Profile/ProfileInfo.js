import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { spacing } from '@material-ui/system';
import {Paper, Divider, Button, TextField, Typography, FormControl, withStyles, Grid } from "@material-ui/core";
import MaskedInput from 'react-text-mask';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
	paperForm: {
		width: '75%',
        display: "flex",
        backgroundColor: "#e0e0e0",
		padding: theme.spacing.unit*3,
		height: '98%',
		margin:"auto",
		marginTop: '2%',
	},
  	container: {
		display: 'flex',
    	flexDirection: 'column',
  	},
	  editerButtons: {
		margin: theme.spacing.unit,
		fontSize: 16,
	},
});


class ProfileInfo extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            first: "",
            last: "",
            user: "",
			pass: "",
			email:"",
			cellnumber: "",
            streetaddr: "",
            cityaddr:"",
            stateaddr: "",
            zipaddr: "",
            dob:"",
			ssn: "",
			sex: "",
			insuranceID: 0,
			editing: false
		};
		this.handleChange=this.handleChange.bind(this);
	}
	retrieveUserInfo() {
		if(window.localStorage.userType === "2"){
			fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.LoginTableID}`)
			.then(result => result.json())
			.then(res => this.setState( {	first: res.data[0].FirstName,
											last: res.data[0].LastName,
											user: res.data[0].Username, 
											pass: res.data[0].Password, 
											email: res.data[0].Email,
											insuranceID: res.data[0].InsuranceClientID,
											dob: res.data[0].DOB,
											ssn: res.data[0].SSN, 
											sex: res.data[0].SexID, 
											cellnumber: res.data[0].CellNumber,
											streetaddr:res.data[0].AddressStreet,
											cityaddr: res.data[0].AddressCity,
											stateaddr: res.data[0].AddressStateID,
											zipaddr: res.data[0].AddressZip}))
			.catch(err => console.log(err));
	    }
	    else{
			fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.LoginTableID}`)
			.then(result => result.json())
			.then(res => this.setState( {	first: res.data[0].FirstName,
											last: res.data[0].LastName,
											user: res.data[0].Username, 
											pass: res.data[0].Password, 
											email: res.data[0].Email,
											dob: res.data[0].DOB,
               								ssn: res.data[0].SSN,
											sex: res.data[0].SexID, 
											cellnumber: res.data[0].CellNumber,
											streetaddr:res.data[0].AddressStreet,
											cityaddr: res.data[0].AddressCity,
											stateaddr: res.data[0].AddressStateID,
											zipaddr: res.data[0].AddressZip}))
			.catch(err => console.log(err))
	    }
	}
	updateUserInfo=()=>{
        //backend call to add the user to the backend
        fetch(`http://157.230.214.92:4000/UpdateUser`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
				UserID: window.localStorage.userID,
				InsuranceID: this.state.insuranceID,
                FirstName:this.state.first,
                LastName:this.state.last,
                Sex: this.state.sex,
                Email: this.state.email,
                username: this.state.user,
                password: this.state.pass,
                CellNumber: this.state.cellnumber,
                AddressStreet: this.state.streetaddr,
                AddressCity: this.state.cityaddr,
                AddressState: this.state.stateaddr,
                AddressZip: this.state.zipaddr,
                userType: window.localStorage.userType,
                LoginTableID: window.localStorage.LoginTableID,
            })
		})
        .catch(err => console.log(err))
        
    }
	EmptyEntries(){
        return  this.state.first === ""||
                this.state.last === "" ||
                this.state.sex === "" ||
                this.state.email === "" ||
                this.state.usern === "" ||
                this.state.pass === "" ||
                this.state.cellnumber === "" ||
                this.state.streetaddr=== "" ||
                this.state.cityaddr === "" ||
                this.state.stateaddr === "" ||
				this.state.zipaddr === "" ||
				this.state.dob.length !== 10 ||
                this.state.ssn.length !== 11 
    }
	validateUsername(){
		if(this.state.user.length >=6 || this.state.user.length <=1 ){
        	return true
    	}
    	return false
	}
	validatePassword(){
    	if(this.state.pass.length >=6 || this.state.pass.length <=1 ){
        	return true
    	}
    	return false
	}
	SSNMaskCustom(props) {
		const {...other } = props;
		return (
		  <MaskedInput
			guide={false}
			{...other}
			mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		  />
		);
	}
	PhoneMaskCustom(props) {
		const {...other } = props;
	  
		return (
		  <MaskedInput
			{...other}
			guide={false}
			mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		  />
		);
	}
	componentDidMount(){
        this.retrieveUserInfo();
    }
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    editMode = _ => {
        this.setState({
            editing: true
        });
    }
    saveChanges = _ => {
		this.updateUserInfo();
		this.retrieveUserInfo();
    	this.setState({
			editing: false
		});
    }
    revertChanges = _ => {
		this.retrieveUserInfo();
        this.setState({
            editing: false
		});
    }
//for implementation of user menu, Paper className will be removed and
// user menu will define css styles. 
  render() { 
	  const {classes}=this.props;
    return (
      <div>
          <Paper className={classes.paperForm}>
            <form  noValidate autoComplete="off">
				<div>
					{window.localStorage.userType=== "2" ? (
						<Typography variant="h5">Welcome {this.state.first}}</Typography>
					):(
						<Typography variant="h5">Welcome Dr. {this.state.last}</Typography>		
					)}
					<Divider variant="middle" />
				</div>
				<div>
					<Typography variant="h6" >User Information</Typography>
					<Grid container spacing={8}>
						<Grid item xs={12} sm={6}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="first"
									label="First Name"
									variant="outlined"
									value={this.state.first}
									defaultValue={this.state.first}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="last"
									label="Last Name"
									variant="outlined"
									value={this.state.last}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={5}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="streetaddr"
									label="Street Address"
									variant="outlined"
									value={this.state.streetaddr}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="cityaddr"
									label="City"
									variant="outlined"
									value={this.state.cityaddr}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={1}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="stateaddr"
									label="State"
									variant="outlined"
									value={this.state.stateaddr}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={2}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="zipaddr"
									label="Zip Code"
									variant="outlined"
									value={this.state.zipaddr}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={12}>
							<FormControl  margin="dense">
								<TextField disabled
									name="dob"
									label="Birthdate"
									variant="outlined"
									value={this.state.dob}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={12}>
							<FormControl  margin="dense" >
								<TextField disabled={!this.state.editing}
									name="cellnumber"
									label="Contact Phone"
									variant="outlined"
									value={this.state.cellnumber}
									inputComponent={this.PhoneMaskCustom(classes)}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={12}>
							<FormControl  margin="dense" >
								<TextField disabled={!this.state.editing}
									name="ssn"
									label="SSN"
									variant="outlined"
									value={ "***-"+"**-"+this.state.ssn.substring(7,11)}
									inputComponent={this.SSNMaskCustom(classes)}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						{ window.localStorage.userType === "2" &&
						<Grid item xs={12} sm={12}>
							<FormControl  margin="dense" >
								<TextField disabled={!this.state.editing}
									name="insuranceID"
									label="Insurance ID"
									variant="outlined"
									value={this.state.insuranceID}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
						}
					</Grid>
					<Divider variant="middle" />
				</div>
				<div>
					<Typography variant="h6">Account Information</Typography>
					<Grid container spacing={8}>
						<Grid item xs={12} sm={5}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="user" 
									label="Username"
									variant="outlined"
									onChange={this.handleChange}
									value={this.state.user}
									error={!this.validateUsername()}
									helperText={this.validateUsername() ? "":"Username is not valid"}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="email" 
									label="Email"
									variant="outlined"
									onChange={this.handleChange}
									value={this.state.email}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl  margin="dense" fullWidth>
								<TextField disabled={!this.state.editing}
									name="pass"
									type="password" 
									label="Password"
									variant="outlined"
									onChange={this.handleChange}
									value={this.state.pass}
									error={!this.validatePassword()}
									helperText={this.validatePassword() ? "":"Password is not valid"}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Divider variant="middle"/>
				</div>
                {!this.state.editing ? (
	                <div>
						{this.retrieveUserInfo()}
						<FormControl margin="none">
						 <Button variant="contained" size="small" className={classes.editerButtons} onClick={this.editMode}>
			        		<EditIcon />
			        			Edit
			      		</Button>
						</FormControl>
		      		</div>
	      		):(
		      		<div>
			      		<FormControl margin="right">
						 	<Button disabled={this.EmptyEntries()} variant="contained" size="small" className={classes.editerButtons} onClick={this.saveChanges}>
			        			<SaveIcon />
			        				Save
			      			</Button>
							  </FormControl>
							  <FormControl margin="left">
						 	<Button variant="contained" size="small" className={classes.editerButtons} onClick={this.revertChanges} >
			        			<CancelIcon />
			        				Revert
			      			</Button>
			      		</FormControl>
		      		</div>
		      	)}
			</form>
          </Paper>
      </div>
    );
  }
}

ProfileInfo.propTypes={
	classes: PropTypes.object.isRequired
};
//PhoneMaskCustom.propTypes = {
//	inputRef: PropTypes.func.isRequired,
//};
export default withStyles (styles)(ProfileInfo);
