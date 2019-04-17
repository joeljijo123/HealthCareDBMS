import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import { Mapper } from '../Components/Locator/Mapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {FormControl, Paper, TextField, Typography, Button, Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Locator.css'


const styles = theme => ({

  paperForm: {
      width: '75%',
      height: '75%',
      flexDirection: 'column',
      margin:"auto",
      display: 'flex',
      marginTop: '2%'
    },

});

class Locator extends React.Component {

  constructor(props){
      super(props)
      this.state = {
          openForm: false,
          Facilities: [],
          displayResults: false,
          searchCity: "",
      };
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
      })
      
  }
  redirect(){
      if(window.localStorage.loggedIn !== "true"){
        window.location.replace('/')
      }
      else{
        window.location.replace('/Appointments')
      }
  }
  getFacilities=()=> {
      fetch(`http://162.243.165.50:4000/Facilities/${this.state.searchCity}`)
      .then(result => result.json())
      .then(res => this.setState({ Facilities:res.data}))
      .catch(err => console.log(err))
  };
  displaySearchRes = _ => {
    this.getFacilities();
      this.setState({
          displayResults: true
      });
  }
  handleClickOpen = () => {
  this.setState({ openForm: true });
  };

  handleClose = () => {
    this.setState({ 
        Facilities: [],
        searchCity: "",
        displayList: false,
        openForm: false,
    });
  };
  render() { 
    const{classes}=this.props;
    return (
      <div className='Locator-image'>
      <NavigationBar title={"My Profile"} Tab={3}/>
        <Paper className={classes.paperForm}>
              <form noValidate autoComplete="off" >
                      <Typography variant="h5">Locate Facility By City</Typography>
                      <Grid container spacing={8} alignContent="center">
                          <Grid item xs={12} sm={8}>
                              <FormControl  margin="auto" fullWidth>
                                  <TextField
                                    name="searchCity"
                                    label="City Vicinity to Search"
                                    variant="outlined"
                                    value={this.state.searchCity}
                                    onChange={this.handleChange}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                              <FormControl align="auto" fullWidth>
                                  <Button variant="contained" size="medium" onClick={this.displaySearchRes}>
                                      <SearchIcon />
                                  </Button>
                              </FormControl>
                          </Grid>
                      </Grid>
              </form>
              <Table className={classes.table}>
                              <TableHead>
                                  <TableRow>
                                      <TableCell align="center">Facility Name</TableCell>
                                      <TableCell align="center">Street Address</TableCell>
                                      <TableCell align="center">City</TableCell>
                                      <TableCell align="center">State</TableCell>
                                      <TableCell align="center">Zip</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                              {this.state.displayResults &&
                                          this.state.Facilities.map(Each => (
                                              <TableRow key={Each.FacilityID}>
                                                  <TableCell align="center">{Each.FacilityName}</TableCell>
                                                  <TableCell align="center">{Each.AddressStreet}</TableCell>
                                                  <TableCell align="center">{Each.AddressCity}</TableCell>
                                                  <TableCell align="center">{Each.AddressState}</TableCell>
                                                  <TableCell align="center">{Each.AddressZip}</TableCell>
                                              </TableRow>
                                          ),)
                              }
                                  
                              </TableBody>
              </Table> 
        </Paper>
      </div>
    );
  }
}

Locator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locator);