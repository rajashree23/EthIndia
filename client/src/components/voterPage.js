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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ipfsABI } from "../js/IPFS";
import Web3 from "web3";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";
const btn = {
  color: "white"
}
export default class VoterPage extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0], loader: true })
    const ipfscontract = new web3.eth.Contract(ipfsABI, "0x7993d027e47b2d2377543c305d9114bd3959845f")
    this.setState({ ipfscontract })

    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    var i;
    var solutions = [];
    var temp = {};
    const len = 2;
    //await this.state.ipfscontract.methods.getSolutionLinkLen(this.props.location.state.data.question).call({ from: fromAcc });
    for (i = 0; i < len; i++) {
      const sollink = await this.state.ipfscontract.methods.solutionLinkList(this.props.location.state.data.question, i).call({ from: fromAcc });
      const readme = await this.state.ipfscontract.methods.solutionLinkDetails(sollink).call({ from: fromAcc });
      temp = { "solverAddress": readme[0], "solutionLink": sollink, "readMe": readme[1] };
      solutions.push(temp);
    }
    this.setState({ solutions: solutions });

  }

  constructor(props) {
    super(props);
    this.state = {
      ipfscontract: null,
      web3: null,
      account: null,
      roleValue: "",
      rolesDialog: true,
      solutions: [],

    }
  }

  Agree = () => {
    this.state.ipfscontract.methods.agree().send({ from: this.state.account }).then((r) => {

      return window.location.reload();
      // this.setState({})

    })
  }
  Disgree = () => {
    this.state.ipfscontract.methods.disgree().send({ from: this.state.account }).then((r) => {

      return window.location.reload();
      // this.setState({})

    })
  }
  render() {
    console.log(this.props)
    return (
      <div style={{ paddingTop: 8 }}>
        <Grid container justify="center" spacing={2}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Icon>
                  list
             </Icon>
              </IconButton>
              <Typography style={{ flex: 1 }} variant="h6" color="inherit">
                ChainWhiZ
          </Typography>
              <div style={{ float: "right" }}>
                <Button style={btn}>Home</Button>

                <Link to="/get_roles" style={{ textDecoration: "none" }}>
                  <Button
                    style={btn}
                  >
                    Get Roles
                  </Button>
                </Link>
                <Button style={btn}>Profile</Button>
                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            <Typography variant="h4" style={{ color: "blue" }} >
              {"Solutions and their Solvers"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <Card style={{ borderRadius: 10 }} >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Typography variant="title" color="inherit" >
                      {"Public Address :-" + this.props.location.state.data.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography variant="subheading" color="inherit" >
                      {"Date :-" + this.props.location.state.data.timestamp}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography color="textSecondary" variant="h6" gutterBottom>
                      <a style={{ fontSize: 15 }} href={"https://ipfs.infura.io/ipfs/" + this.props.location.state.data.question} target="_blank" >
                        {this.props.location.state.data.question}  </a>
                    </Typography>

                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={10}>

            {this.state.solutions.length > 0 && <span>
              {this.state.solutions.map(s => (
                <div>
                  <Card style={{ borderRadius: 10 }} >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Typography variant="h6"  >
                            {"Solver Address"}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <Typography variant="h6" >
                            {"Solution Link"}
                          </Typography>
                          <Typography variant="h6" >
                            {"ReadMe File "}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={3} style={{ textAlign: "center" }}>
                          <IconButton onClick={this.onAgree}>
                            <Icon>
                              thumb_up_alt
                      </Icon>
                          </IconButton>
                          <IconButton onClick={this.onDisagree}>
                            <Icon>
                              thumb_down_alt
                      </Icon>
                          </IconButton>

                        </Grid>

                      </Grid>
                    </CardContent>
                  </Card>

                  <br />
                </div>

              ))}</span>}

          </Grid>
        </Grid>
      </div>

    )
  }
}