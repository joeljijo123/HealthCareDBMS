import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
    root: {
        width: '75%',
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    page: {
        height: "100vh",
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    AdditionButton: {
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
  
    },
    Button: {
        marginTop: '.5%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '20%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '100%',
        margin: 'auto'
      },
});


class AppointmentReports extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    render(){
        const classes = this.props;
        return(
            <div className={classes.page}>
               <h1>This is the Reports Page</h1>
            </div>
        );
    }
    
}

AppointmentReports.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AppointmentReports);
