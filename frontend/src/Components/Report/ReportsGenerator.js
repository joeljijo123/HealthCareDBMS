import React, { Component } from 'react';
import FacilityReports from '../Report/FacilityReports';
import { Paper, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme =>({
    root: {
        width: '35%',
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit*3,
        marginTop:"5%",
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
      </div>
    );
  }
}

ReportsGenerator.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ReportsGenerator);
