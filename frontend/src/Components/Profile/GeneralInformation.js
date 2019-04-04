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
			editing: false
		};
		this.handleChange=this.handleChange.bind(this);
		this.editMode=this.editMode.bind(this);
	}
	retrieveUserInfo() {
		if(window.localStorage.userType===2){
	      fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.LoginTableID}`)
	      .then(result => result.json())
	      .then(res => {this.setState=(  { first: res.data[0].FirstName  },
	      								 { last: res.data[0].LastName  },
	      								 { user: res.data[0].username},
	      								 { pass: res.data[0].password}
	       )})
	      .catch(err => console.log(err))
	    }
	    else{
	      fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.LoginTableID}`)
	      .then(result => result.json())
	      .then(res => {this.setState=(  { first: res.data[0].FirstName  },
	      								 { last: res.data[0].LastName  },
	      								 { user: res.data[0].username},
	      								 { pass: res.data[0].password}
	       )})
	      .catch(err => console.log(err))
	    }

	}
	updateUserInfo(){
		if(window.localStorage.userType===2){
			fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.LoginTableID}`)
			.then(result => result.json())
			.then(res => {this.setState=(  { first: res.data[0].FirstName  },
											 { last: res.data[0].LastName  },
											 { user: res.data[0].username},
											 { pass: res.data[0].password}
			 )})
			.catch(err => console.log(err))
		  }
		  else{
			fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.LoginTableID}`)
			.then(result => result.json())
			.then(res => {this.setState=(  { first: res.data[0].FirstName  },
											 { last: res.data[0].LastName  },
											 { user: res.data[0].username},
											 { pass: res.data[0].password}
			 )})
			.catch(err => console.log(err))
		  }
	  
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
	componentDidMount(){
        this.retrieveUserInfo();
    }
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    editMode=(e) => {
        this.setState({
            editing: true
        });
    }
    saveChanges() {
    	this.setState({
			editing: false
		});
		//updateUserInfo();
    }
    revertChanges() {
        this.setState({
            editing: false
		});
		//retrieveUserInfo();
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
                    <TextField readOnly={!this.state.editing}
                    	name="FirstName"
                    	defaultValue={this.state.first}
                        label="First Name" 
                        variant="outlined"
                    	value={this.state.first}
                    	onChange={this.handleChange}
                    />
                </FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
                <FormControl  margin="dense">
                    <TextField readOnly={!this.state.editing}
                    	name="LastName"
                    	defaultValue={this.state.last}
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
                    <TextField readOnly={!this.state.editing}
                        name="username" 
                        defaultValue={this.state.user}
                        label="Username" 
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.user}
                        error={!this.validateUsername()}
                        helperText={this.validateUsername() ? "":"Username is not valid"}
                    />
                </FormControl>
				<FormControl margin="dense">
                    <TextField readOnly={!this.state.editing}
						name="Email" 
						defaultValue={this.state.email}
                        label="Email" 
                        variant="standard"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                </FormControl>
                <FormControl  margin="dense">
                    <TextField readOnly={!this.state.editing}
                        name="password"
                        type="password" 
						label="Password" 
						defaultValue={this.state.pass}
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.pass}
                        error={!this.validatePassword()}
                    />
                </FormControl>
        		<Divider variant="middle"/>
                {this.state.editing===false ? (
	                <div>
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
						 	<Button variant="leftIcon" size="small" className={classes.editerButtons} onClick={this.saveChanges}>
			        			<SaveIcon />
			        				Save
			      			</Button>
						 	<Button variant="rightIcon" size="small" className={classes.editerButtons} onClick={this.revertChanges} >
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

GeneralInformation.propTypes={
	classes: PropTypes.object.isRequired
};
export default withStyles (styles)(GeneralInformation);
