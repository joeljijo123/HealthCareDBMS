import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Divider, Button, TextField, Typography, FormControl, withStyles, Grid } from "@material-ui/core";
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


class GeneralInformation extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            first: "",
            last: "",
            user: "",
			pass: "",
			email:"",
			insuranceID:0,
			sex:"",
			cellNumber: "",
			Street:"",
			City:"",
			State:"",
			Zip:"",
			editing: false
		};
		this.handleChange=this.handleChange.bind(this);

	}
	componentDidMount(){
		this.retrieveUserInfo();
	}
	retrieveUserInfo() {
		if(window.localStorage.userType === "2"){

			fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.LoginTableID}`)
			.then(result => result.json())
			.then(res => this.setState( {	first: res.data[0].FirstName, last: res.data[0].LastName, user: res.data[0].Username, pass: res.data[0].Password, email: res.data[0].Email,
			insuranceID: res.data[0].InsuranceClientID, sex: res.data[0].SexID, cellNumber: res.data[0].CellNumber,Street:res.data[0].AddressStreet,City: res.data[0].AddressCity,	State: res.data[0].AddressStateID,
			Zip: res.data[0].AddressZip}))
			.catch(err => console.log(err));
	    }
	    else{
			fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.LoginTableID}`)
			.then(result => result.json())
			.then(res => this.setState( {	first: res.data[0].FirstName, last: res.data[0].LastName, user: res.data[0].Username, pass: res.data[0].Password, email: res.data[0].Email,
				sex: res.data[0].SexID, cellNumber: res.data[0].CellNumber,Street:res.data[0].AddressStreet,City: res.data[0].AddressCity,	State: res.data[0].AddressStateID,
				Zip: res.data[0].AddressZip}))
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
                CellNumber: this.state.cellNumber,
                AddressStreet: this.state.Street,
                AddressCity: this.state.City,
                AddressState: this.state.State,
                AddressZip: this.state.Zip,
                userType: window.localStorage.userType,
                LoginTableID: window.localStorage.LoginTableID,
            })
		})
        .catch(err => console.log(err))
        
    }
	validateUsername(){
    	return true
	}
	validatePassword(){
    	if(this.state.pass.length >=6 || this.state.pass.length <=1 ){
        	return true
    	}
    	return false
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

  render() { 
  	const {classes}=this.props;
    return (
      <div>
          <Paper className={classes.paperForm}>
            <form className={classes.container} noValidate autoComplete="off">
            	<Typography variant="h5">User Information</Typography>
					<Grid container spacing={8}>
						<Grid item xs={12} sm={6}>
							<FormControl  margin="dense">
								<TextField disabled={!this.state.editing}
									name="first"
									label="First Name" 
									variant="outlined"
									value={this.state.first}
									onChange={this.handleChange}
								/>
							</FormControl>
						</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl  margin="dense">
							<TextField disabled={!this.state.editing}
								name="last"
								label="Last Name" 
								variant="outlined"
								value={this.state.last}
								onChange={this.handleChange}
							/>
						</FormControl>
					</Grid>
					</Grid>
        		<Divider variant="middle" />
      			<Typography variant="h5">Account Information</Typography>
                <FormControl  margin="dense">
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
				<FormControl margin="dense">
                    <TextField disabled={!this.state.editing}
						name="email" 
                        label="Email" 
                        variant="standard"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                </FormControl>
                <FormControl  margin="dense">
                    <TextField disabled={!this.state.editing}
                        name="pass"
                        type="password" 
						label="Password" 
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.pass}
                        error={!this.validatePassword()}
                    />
                </FormControl>
        		<Divider variant="middle"/>
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
							<FormControl margin="none">
								<Button size="small" className={classes.editerButtons} onClick={this.saveChanges}>
									<SaveIcon />Save
								</Button>
								<Button variant="rightIcon" size="small" className={classes.editerButtons} onClick={this.revertChanges} >
									<CancelIcon />Revert
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

GeneralInformation.propTypes={
	classes: PropTypes.object.isRequired
};
export default withStyles (styles)(GeneralInformation);
