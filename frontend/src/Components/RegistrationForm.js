import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeLogo  from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';    
import BasicInformation from '../Components/BasicInformation';
import BasicInformationPtTwo from '../Components/BasicInformationPtTwo';


const styles = theme => ({
    paperForm: {
        width: '25%',
        marginLeft: '7%',
        marginTop: '-15%',
        padding: theme.spacing.unit*2,
        flexDirection: 'column',
        backgroundColor: "#e0e0e0",
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: "150%",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: theme.spacing.unit*2,
    },
    middleInitial: {
        width:"15%",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: theme.spacing.unit*2
    },
    heading: {
        margin: theme.spacing.unit,
        marginLeft: "70%",
        marginTop: "10%",
        color: "white",
    },
});


  

  

class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            FirstName: "",
            Minit: "",
            LastName: "",
            Sex:"",
            Email:"",
            CellNumber: " ",
            DateOfBirth:"",
            AddressStreet: "",
            AddressCity:"",
            State: "",
            AddressZip: "",
            username: "",
            password: "",
            registrationStep: 0,

        };
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state.registrationStep);
    }
    homeRedirect = () =>{
        window.location.replace('/');
    }
    stepNext=()=>{
        this.setState(state => ({
            registrationStep:state.registrationStep+1
        }))
    }
    render(){
        const {classes}=this.props;
        return(
            <div>
                <IconButton onClick={this.homeRedirect}>
                    <HomeLogo style={{color: "#212121"}} className={classes.icon} />
                </IconButton>
                <Typography variant="h3" className={classes.heading}>Medical Center Registration</Typography>
                <Paper elevation={10} className={classes.paperForm}>
                    {this.state.registrationStep===0 ? (
                        <div>
                            <BasicInformation handleChange={this.handleChange} val={this.state}/>
                            <FormControl margin="normal" fullWidth >
                                <Button onClick={this.stepNext}>
                                    Next
                                </Button>
                            </FormControl>
                        </div>
                    ):(
                        <div>
                            <BasicInformationPtTwo handleChange={this.handleChange} val={this.state}/>
                        </div>

                    )}
                    
                </Paper>
            </div>
        );
    }
    
}

RegistrationForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationForm);