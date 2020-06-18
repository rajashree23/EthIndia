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
  constructor(props) {
    super(props);
    this.state = {
      questions: [{ question: "What does SIM stands for??", reward: "1200", Timestamp: "12 july 2020" }]
    }
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
                            {"Public Address :-"}
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
                            {"Balance :-"}
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
                            {"Role :-"}
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
                        <TableCell align="right">view</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.questions.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.question}
                          </TableCell>
                          <TableCell align="right">{row.reward}</TableCell>
                          <TableCell align="right">{row.Timestamp}</TableCell>
                          <TableCell align="right">
                            <Button color="primary" variant="outlined" size="small"
                              onClick={() => { this.setState({ viewDialog: true }) }}
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
                            <TableCell align="right">Link</TableCell>
                            <TableCell align="right">Read me</TableCell>
                            <TableCell align="right">Vote %</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.questions.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.question}
                              </TableCell>
                              <TableCell align="right">{row.reward}</TableCell>
                              <TableCell align="right">{row.Timestamp}</TableCell>
                              <TableCell align="right">
                                {"34%"}
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
        <br/>
        <Footer />
      </div>
    )
  }
}