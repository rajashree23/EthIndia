import React from "react";
import regPublisherVerify from "../js/regPublisher"
import regVoterVerify from "../js/regVoter"
import regSolverVerify from "../js/regSolver"
import Web3 from "web3";
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
import Loader from "./loader";
import { rolesABI } from "../js/roles";
import { Redirect } from "react-router-dom";
export default class MaticPage extends React.Component {
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.setState({ openSnackBar: true, messageSnackBar: "Change Network to Matic" });
  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0], loader: true })


    const rolescontract = new web3.eth.Contract(rolesABI, "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe")
    this.setState({ rolescontract })

    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    var role = await rolescontract.methods.verifyPublisher().call({ from: fromAcc });
    if (role)
    {
      this.setState({ role: "Publisher", loader: false });
      // window.location.reload();
    }
      
    
    else {
      role = await rolescontract.methods.verifyVoter().call({ from: fromAcc });
      if (role)
      {
        this.setState({ role: "Voter", loader: false });
        // window.location.reload();
      }
      else {
        role = await rolescontract.methods.verifySolver().call({ from: fromAcc });
        if (role)
        {
          this.setState({ role: "Solver", loader: false });
          // window.location.reload();
        }
      }
      this.setState({loader:false});

      
    }
  
    
  }


  constructor(props) {
    super(props);
    this.state = {
      roleValue: "",
      rolesDialog: true,
      redirect: "",
      openSnackBar: false,
      messageSnackBar: "",
      account: null,
     
      loader: true,
      role: ""

    }
  }

  getRoles = () => {
    var a = null;
    this.setState(
      {
        openSnackBar: true,
        messageSnackBar: "Confirm transaction and change to ropsten"
      }
    );
    if (this.state.roleValue === "Publisher") {
      a = regPublisherVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }


    }

    else if (this.state.roleValue === "Voter") {
      a = regVoterVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }
    }
    else if (this.state.roleValue === "Solver") {
      a = regSolverVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }

    }
  }





  render() {
    if (this.state.role !== "" && this.state.role !== false) {
      return <Redirect to="/" />;

    }
    return (
      <div style={{ backgroundColor: "black" }}>
        <Dialog
          style={{ backgroundColor: "#5F5F5F" }}
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
        {this.state.loader &&
          <Loader />
        }
        <SnackBar
          open={this.state.openSnackBar}
          message={this.state.messageSnackBar}
        />
      </div>
    )
  }
}