import React, { Component } from 'react';
import FacilityReports from './FacilityReports';
import { Paper, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DoctorsReport from './DoctorsReport';
import CheckUpReport from './CheckUpReport';
import Facilities from './Facilities';

const styles = theme =>({
    root: {
        width: '55%',
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit*3,
        marginTop:"5%",
        marginBottom:"5%",
        margin:"auto"
  
    },
    checkUp: {
      width: '55%',
      display: "flex",
      flexDirection: 'column',
      padding: theme.spacing.unit*3,
      marginTop:"5%",
      marginBottom:"5%",
      margin:"auto"

  },
});

class ReportsGenerator extends Component {
  render() { 
    const{classes}=this.props;
    return (
      <div>
          <Paper className={classes.root}>
            <FacilityReports/>
          </Paper>
          <Paper className={classes.root}>
            <DoctorsReport/>
          </Paper>
          <Paper className={classes.checkUp}>
            <CheckUpReport/>
          </Paper>
          <Paper className={classes.checkUp}>
            <Facilities/>
          </Paper>
      </div>
    );
  }
}

ReportsGenerator.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ReportsGenerator);
