import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, Typography,} from '@material-ui/core';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme =>({
    Button: {
        marginTop: '2%',
    },
});


class Administration extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Report: [],
        };
    }
    fetchFacilities(){
        fetch(`http://162.243.165.50:4000/FacilitiesAdmin`)
        .then(result => result.json())
        .then(Response => this.setState({ Report:Response.data }))
        .catch(err => console.log(err))
    };
 
    handleClickOpen = () => {
        this.fetchFacilities();
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ 
            Report: [],
            openForm:false,
        });
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
            <Typography variant="h5">Facilities</Typography>
               
                <Button variant="contained" color="inherit" fullWidth className={classes.Button} onClick={this.handleClickOpen}>
                    See All Facilty Information
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Facility Information</DialogTitle>
                    <DialogContent>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">FacilityID </TableCell>
                                    <TableCell align="center">Facility Name</TableCell>
                                    <TableCell align="center">Facility Address</TableCell>
                                    <TableCell align="center">Facility Administrator</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                        {this.state.Report.map(Each => (
                                            <TableRow key={Each.FacilityID}>
                                                <TableCell align="center">{Each.FacilityID}</TableCell>
                                                <TableCell align="center">{Each.FacilityName}</TableCell>
                                                <TableCell align="center">{Each.Street}, {Each.City}, {Each.State} {Each.Zip}</TableCell>
                                                <TableCell align="center">{Each.FirstName} {Each.LastName}</TableCell>
                                            </TableRow>
                                        ))}
                                
                            </TableBody>
                        </Table>                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

Administration.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Administration);
