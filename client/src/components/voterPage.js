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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";
const btn = {
  color: "white"
}
export default class VoterPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      roleValue: "",
      rolesDialog: true
    }
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
                    <IconButton>
                      <Icon>
                        thumb_up_alt
                      </Icon>
                    </IconButton>
                    <IconButton>
                      <Icon>
                        thumb_down_alt
                      </Icon>
                    </IconButton>

                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

    )
  }
}