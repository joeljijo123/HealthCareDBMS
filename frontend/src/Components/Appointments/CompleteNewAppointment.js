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
      primary: {main: teal[600]},
    },
    overrides: {
        MuiPickersToolbar: {
          toolbar: {
            backgroundColor: teal[600],
          },
        },
        MuiPickersDay: {
          day: {
            color: teal[600],
          },
          isSelected: {
            backgroundColor: teal["600"],
          },
          current: {
            color: teal["600"],
          },
        },
        MuiPickersModal: {
          dialogAction: {
            color: teal["600"],
          },
        },
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
                            value={this.state.DeliveryDate}
                            onChange={this.dateChanged}
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