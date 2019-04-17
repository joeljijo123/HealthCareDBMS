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


class CheckUpReport extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Report: [],
        };
    }
    fetchCheckUps(){
        fetch(`http://162.243.165.50:4000/CheckUp`)
        .then(result => result.json())
        .then(Response => this.setState({ Report:Response.data }))
        .catch(err => console.log(err))
    };
 
    handleClickOpen = () => {
        this.fetchCheckUps();
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
            <Typography variant="h5">Six Month Check Up Report</Typography>
               
                <Button variant="contained" color="inherit" fullWidth className={classes.Button} onClick={this.handleClickOpen}>
                    Show Patients Who need a 6-Month CheckUp
                </Button>
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Patients that need to be contacted</DialogTitle>
                    <DialogContent>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name </TableCell>
                                    <TableCell align="center">Contact Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                        {this.state.Report.map(Each => (
                                            <TableRow key={Each.FirstName}>
                                                <TableCell align="center">{Each.FirstName} {Each.LastName}</TableCell>
                                                <TableCell align="center">{Each.CellNumber}</TableCell>
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

CheckUpReport.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CheckUpReport);
