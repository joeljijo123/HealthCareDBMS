import React, { Component } from 'react';
import FacilityReports from '../Report/FacilityReports';
import { Paper, withStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import DoctorsReport from './DoctorsReport';

const styles = theme =>({
    root: {
        width: '55%',
        alignItems: "center",
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
      </div>
    );
  }
}

ReportsGenerator.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ReportsGenerator);
