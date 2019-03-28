import { Paper, TextField } from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paperForm: {
        width: '25%',
        margin: 'auto',
        marginTop: '5%',
        padding: theme.spacing.unit*2,
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: theme.spacing.unit*2,
        width: "37%"
    },
    middleInitial: {
        width:"15%",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: theme.spacing.unit*2
    },
    heading: {
        align: 'center',
        marginTop: '5%',
    }
});

class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            FirstName: "",
            Minit: "",
            LastName: "",
        };
        this.handleChange=this.handleChange.bind(this);
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
                <h1 align='center' marginTop='7%'>Medical System Registration Form</h1>
                <Paper elevation={10} className={classes.paperForm} >
                    <TextField
                        id="FirstName"
                        label="First Name"
                        variant="outlined"
                        className={classes.TextField}
                        value={this.state.FirstName}
                        margin="dense"                        
                    />
                    <TextField
                        id="FirstName"
                        label="Middle"
                        variant="outlined"
                        className={classes.middleInitial}
                        value={this.state.FirstName}
                        margin="dense"                        
                    />
                    <TextField
                        id="FirstName"
                        label="Last  Name"
                        variant="outlined"
                        className={classes.TextField}
                        value={this.state.FirstName}
                        margin="dense"                        
                    />
                    <TextField
                        id="FirstName"
                        label="Last  Name"
                        variant="outlined"
                        className={classes.TextField}
                        value={this.state.FirstName}
                        margin="dense"                        
                    />
                </Paper>
            </div>
        );
    }
    
}

RegistrationForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationForm);