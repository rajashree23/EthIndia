import React from "react";
import regPublisherVerify from "../js/regPublisher"
import regVoterVerify from "../js/regVoter"
import regSolverVerify from "../js/regSolver"

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
import SnackBar from "./snackbar";
import { Redirect } from "react-router-dom";
export default class MaticPage extends React.Component {

  componentDidMount() {
    this.setState({ openSnackBar: true, messageSnackBar: "Change Network to Matic" });
  }

  constructor(props) {
    super(props);
    this.state = {
      roleValue: "",
      rolesDialog: true,
      redirect: "",
      openSnackBar: false,
      messageSnackBar: "",

    }
  }

  getRoles = () => {
    this.setState({ openSnackBar: true, messageSnackBar: "Confirm transaction and change to ropsten" });
    if (this.state.roleValue === "Publisher") {
      var a = regPublisherVerify();
      this.setState({ redirect: a  })
       
    }

    else if(this.state.roleValue==="Voter")
     {
      var a=regVoterVerify();
      this.setState({ redirect: a  })
     }
     else if(this.state.roleValue==="Solver")
     { 
      var a=regSolverVerify();
      this.setState({ redirect: a  })

     }
  }





  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/" />;

    // }
    return (
      <div style={{backgroundColor:"black"}}>
        <Dialog
style={{backgroundColor:"#5F5F5F"}}
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
                 this.getRoles();
              }}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Submit
      </Button>
          </DialogActions>
        </Dialog>
        <SnackBar
          open={this.state.openSnackBar}
          message={this.state.messageSnackBar}
        />
      </div>
    )
  }
}