import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });

  const TealTheme = createMuiTheme({
    palette: {
      primary: {main: '#a09d9d'},
    },
  })

function CompleteNewAppointment(props){
    const { classes } = props;
    return(
        <div>
            <FormControl className={classes.PriceMargin}>
                <MuiThemeProvider theme={TealTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                    
                        <DatePicker
                            minDate={new Date()}
                            label="Desired Delivery"
                            value={props.val.AppointmentDate}
                            onChange={e=> props.AppointmentDateChange(e)}
                        />

                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </FormControl>
        </div>
    );
}

CompleteNewAppointment.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CompleteNewAppointment);