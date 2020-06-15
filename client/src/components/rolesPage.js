import React from "react";

import {
  Button,
  IconButton,
  Icon,
  Grid,
  MenuItem,
  TextField
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class MaticPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      roleValue: "",
      rolesDialog: true
    }
  }
  render() {
    return (
      <Dialog

        open={this.state.rolesDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Select your role and Make Payment"}</DialogTitle>
        <Grid container>
          <DialogContent>
            <Grid container item xs={12} md={12}>

              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={this.state.roleValue}
                  select
                  label={"Select Role"}
                  onChange={(e) => { this.setState({ roleValue: e.target.value }) }}
                >
                  <MenuItem value="Publisher">{"Publisher"}</MenuItem>
                  <MenuItem value="Voter">{"Voter"}</MenuItem>
                  <MenuItem value="Solver">{"Solver"}</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
        <DialogActions>

          <Button
            onClick={() => {
              this.setState({ rolesDialog: false });
            }}
            color="primary"
            autoFocus
            variant="outlined"
          >
            Submit
      </Button>
        </DialogActions>
      </Dialog>

    )
  }
}