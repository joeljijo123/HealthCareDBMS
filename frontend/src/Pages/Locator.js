import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {FormControl, Paper, TextField, Typography, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Locator.css'


const styles = theme => ({

  paperForm: {
      width: '75%',
      padding: theme.spacing.unit*2,
      backgroundColor: "#e0e0e0",
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
  findTab(){
    if(window.localStorage.userType === "3"){
      return 4
    }
    else{
      return 3
    }
  }
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
        <div className='Locator-overlay'>
          <NavigationBar title={"City Locator"} Tab={this.findTab}/>
          <Paper className={classes.paperForm}>
            <Typography variant="h5" align={"center"}>Locate Facility By City</Typography>
            <br/>
            <FormControl  margin="auto" >
                <TextField
                  name="searchCity"
                  label="City Vicinity to Search"
                  variant="outlined"
                  value={this.state.searchCity}
                  onChange={this.handleChange}
                  gutter
                />
            </FormControl>
            <br/>
            <Button variant="primary" marginTop={'10%'} size="medium" onClick={this.displaySearchRes}>
                <SearchIcon />
            </Button>
            {this.state.displayResults &&
              <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Facility Name</TableCell>
                        <TableCell align="center">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
              
                {this.state.Facilities.map(Each => (
                    <TableRow key={Each.FacilityID}>
                        <TableCell align="center">{Each.FacilityName}</TableCell>
                        <TableCell align="center">{Each.AddressStreet}, {Each.AddressCity},{Each.AddressState} {Each.AddressZip} </TableCell>
                    </TableRow>
                ))}
                </TableBody>
              </Table> 
            }
          </Paper>
        </div>
      </div>
    );
  }
}

Locator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locator);