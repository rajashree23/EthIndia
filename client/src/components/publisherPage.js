import React from "react";
import { ipfsABI } from "../js/IPFS";
import ipfs from "../js/ipfshttp"
import Web3 from "web3";
import {
  Button,
  IconButton,
  Icon,
  Grid,
  TextField
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";
import Footer from "./footer";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import chainWizImage from "./BG2.png";
const chainWiz = {
  backgroundImage: "url(" + chainWizImage + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const btn = {
  color: "white"
}

export default class PublisherPage extends React.Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async componentWillReceiveProps(prev, next) {
    this.setState({});
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
    const ipfscontract = new web3.eth.Contract(ipfsABI, "0xa35ab86d2e8a609e8ee044eb6c47aef293e24596")
    this.setState({ ipfscontract })
    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    var questions = [];
    const len = await this.state.ipfscontract.methods.getIpfsQuestionLen().call({ from: fromAcc });
    var i;
    var cont = [];
    for (i = len - 1; i >= 0; i--) {
      const details = await this.state.ipfscontract.methods.publisherProfile(i).call({ from: fromAcc });
      var temp = {};

      temp = { "question": details[0], "reward": details[1], "timestamp": details[2] }
      questions.push(temp);
    }
    this.setState({ questions: questions });

  }

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      solutions: []
    }
  }

  async viewSol(ques) {
    var solutions = [];
    const len = await this.state.ipfscontract.methods.getSoutionLinkLen(ques).call({ from: this.state.account });
    var i;
    for (i = 0; i < len; i++) {
      const details = await this.state.ipfscontract.methods.solutionLinkList(ques, i).call({ from: this.state.account });
      const details1 = await this.state.ipfscontract.methods.solutionLinkDetails(details).call({ from: this.state.account });
      const res = await this.state.ipfscontract.methods.getAccuracy(details).call({ from: this.state.account });
      var temp = {};
      temp = { "solver": details1[0], "solutionLink": details, "readme": details1[1], "vote": res }

      solutions.push(temp);
    }
    this.setState({ solutions: solutions });
    console.log(this.state.solutions);
  }
  render() {
    return (
      <div>
        <Grid container justify="center" >
          <AppBar style={chainWiz} position="static">
            <Toolbar variant="dense">
              <Link to="/" style={{ textDecoration: "none" }}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <Icon style={{ color: "white" }}>
                    view_headline
             </Icon>
                </IconButton>
              </Link>

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

                {/* <Button style={btn}>Profile</Button> */}
                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>

          </AppBar>
          <Card raised={true} style={{ borderRadius: 10, marginTop: 10 }} >
            <CardContent>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="title" color="inherit" >
                            {"Public Address :-" + this.state.account}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="title" color="inherit" >
                          {}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="title" color="inherit" >
                            {}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="title" color="inherit" >
                          {this.state.address}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="title" color="inherit" >
                            {"Role :- Publisher"}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="title" color="inherit" >
                          {this.state.address}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">Reward</TableCell>
                        <TableCell align="right">Timestamp</TableCell>
                        <TableCell align="right">View</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.questions.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            <a style={{ fontSize: 15 }} href={"https://ipfs.infura.io/ipfs/" + row.question} target="_blank" >
                              {row.question}  </a>
                          </TableCell>
                          <TableCell align="right">{row.reward}</TableCell>
                          <TableCell align="right">{row.timestamp}</TableCell>
                          <TableCell align="right">
                            <Button color="primary" variant="outlined" size="small"
                              onClick={() => {
                                this.setState({ viewDialog: true });
                                this.viewSol(row.question);
                              }}
                            >View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>


              </Grid>
            </CardContent>
            <CardActions>


            </CardActions>
            <Dialog
              open={this.state.viewDialog}
              maxWidth={"md"}
              fullWidth={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">View Solvers </DialogTitle>
              <Grid container>
                <DialogContent>
                  <Grid container spacing={2} item xs={12} md={12}>
                    <Grid item xs={12} md={12}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Solver Address</TableCell>
                            <TableCell align="left">Link</TableCell>
                            <TableCell align="left">Read me</TableCell>
                            <TableCell align="left">Vote(%)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.solutions.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.solver}
                              </TableCell>
                              <TableCell align="right"><a style={{ fontSize: 15 }} href={row.solutionLink} target="_blank" >{row.solutionLink}</a></TableCell>

                              <TableCell align="right">
                                <a style={{ fontSize: 15 }} href={"https://ipfs.infura.io/ipfs/" + row.readme} target="_blank" >
                                  {row.readme}  </a>
                              </TableCell>
                              <TableCell align="right">
                                {row.vote}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Grid>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.setState({ viewDialog: false });
                  }}
                  color="primary"
                  variant="outlined"
                >
                  Close
          </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    )
  }
}