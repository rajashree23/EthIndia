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

import {SocialMediaIconsReact} from 'social-media-icons-react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import chainWizImage from "./BG2.png";
// import chainWizImages from "./BG34.png";
const chainWiz = {
  backgroundImage: "url(" + chainWizImage + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}
// const chainWizz = {
//   backgroundImage: "url(" + chainWizImages + ")",
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: 'cover',
//   padding:0
// }
const btn = {
  color: "white"
}
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // questions: [{ question: "What does SIM stands for??", reward: "1200", Timestamp: "12 july 2020" }],
      about: "A Platform where Ethereum Developers come together and solve Blockchain related queries"
    }
  }


  render() {
    return (
      <div style={chainWiz}>
        <Grid container justify="center"  >
         
          <Grid item xs={4} md={4}>
            <br />
            <div style={{marginLeft:80}}>
            <Typography style={{ color: "white" }} variant="h5"  >
              {"About ChainWhiZ : "}
            </Typography>
            <ListItem style={{ paddingTop: 0 }}>
              <ListItemText
                primary={
                  <Typography style={{ color: "white" }} variant="title"  >
                    {this.state.about}
                  </Typography>
                }
              />
            </ListItem>
            </div>
            
          </Grid>
          <Grid item xs={4} md={4}  >
            <br />
            <div style={{marginLeft:60}} >
              <Typography style={{ color: "white" }} variant="h5"  >
                {"Contact : "}
              </Typography>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"chainwhiz@gmail.com"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"+91-9087654321"}
                    </Typography>
                  }
                />
              </ListItem>
            </div>
            <div style={{marginLeft:80}} >
              <br/>
              <br/>
            <SocialMediaIconsReact iconSize={5} icon="facebook" url=""/>
            &nbsp;
            &nbsp;
            <SocialMediaIconsReact iconSize={5} icon="github" url=""/>
            &nbsp;
            &nbsp;

            <SocialMediaIconsReact iconSize={5} icon="twitter" url=""/>
            &nbsp;
            &nbsp;
            <SocialMediaIconsReact iconSize={5} icon="youtube" url="https://www.youtube.com/watch?v=GyN9o1ZhN5M"/>
            </div>


          </Grid>
          <Grid item xs={4} md={4}>
            <br />
            <Typography style={{ color: "white" }} variant="h5"  >
              {"Developers : "}
            </Typography>
            <List>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"Parabjeet Singh"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"Ashis Kumar Pradhan"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"Rajashree Parhi"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"Monalisha Mishra"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem style={{ paddingTop: 0 }}>
                <ListItemText
                  primary={
                    <Typography style={{ color: "white" }} variant="title"  >
                      {"Md Mohsin Siddiqui"}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>

        </Grid>
      </div>
    )
  }
}