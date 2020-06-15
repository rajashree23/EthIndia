import React from "react";
import Web3 from "web3";
//import {regPublisherVerify} from "../js/index";
//import regPublisherVerify from "../js/index2"
import ipfs from "../js/ipfshttp";
import { ipfsABI } from "../js/IPFS";
import { rolesABI } from "../js/roles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import regPublisherVerify from "../js/index3"

import {
  Button,
  IconButton,
  Icon,
  Grid,
  MenuItem,
  TextField
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QuestionsCard from "./questionCard";
import UploadSection from "./uploadSection";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from "./loader";
import SnackBar from "./snackbar";

//var regPublisherVerify=require("../js/index")



const btn = {
  color: "white"
}
export default class HomePage extends React.Component {
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
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const ipfscontract = new web3.eth.Contract(ipfsABI, "0x7993d027e47b2d2377543c305d9114bd3959845f")
    this.setState({ ipfscontract })
    const rolescontract = new web3.eth.Contract(rolesABI, "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe")
    this.setState({ rolescontract })
    // const networkId = await web3.eth.net.getId()
    // const networkData = IPFS.networks[networkId]
    // if (networkData) {
    //   const contract = new web3.eth.Contract(IPFS.abi, 0x7993d027e47b2d2377543c305d9114bd3959845f)
    //   this.setState({ contract })
    //   // const memeHash = await contract.methods.get().call()
    //   // this.setState({ memeHash })
    // } else {
    //   window.alert('Smart contract not deployed to detected network.')
    // }
    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    var role = await rolescontract.methods.verifyPublisher().call({ from: fromAcc });
    if (role === true)
      this.setState({ roleValue: "Publisher" });
    else {
      role = await this.state.rolescontract.methods.verifyVoter().call({ from: fromAcc });
      if (role === true)
        this.setState({ roleValue: "Voter" });
      else {
        role = await this.state.rolescontract.methods.verifySolver().call({ from: fromAcc });
        if (role === true)
          this.setState({ roleValue: "Solver" });
      }
    }






    var questions = [];
    const len = await this.state.ipfscontract.methods.getQuestionListLength().call({ from: fromAcc });
    var i;

    var cont = [];
    for (i = len - 1; i >= 0; i--) {
      const ques = await this.state.ipfscontract.methods.getQuestionKey(i).call({ from: fromAcc });

      // ipfs.get(ques, function (err, files) {
      //   files.forEach((file) => {

      //     var contents = new TextDecoder("utf-8").decode(file.content);
      //     // console.log(contents);
      //     cont.push(contents);




      //   })
      // })

      const details = await this.state.ipfscontract.methods.displayQuestionDetails(ques).call({ from: fromAcc });
      const seconds = new Date().getTime() / 1000;
      //  this.setState({ c: cont },function(){
      // console.log(this.state.c);


      var temp = {};
      if (details[1] >= seconds) {

        temp = { "address": details[0], "question": ques, "timestamp": details[2], "label": true }
      }
      else {
        
        if(details[3]=="0x0000000000000000000000000000000000000000")
         {  
              //send voting details and call for winning solver address
              const sollinkslen = await this.state.ipfscontract.methods.questionSolverSolutionLinks(ques).call({ from: fromAcc });
              var max=0;
              var sol=[];
              var ressolver="";
              for(i=0;i<sollinkslen;i++)
              {
                  sol = await this.state.ipfscontract.methods.getSolutionLink(i,ques).call({from:fromAcc});
                 const res = await this.state.ipfscontract.methods.getAccuracy(sol[0]).call({from:fromAcc});
                 if(res>max)
                 {
                   max=res;
                   ressolver=sol[1];
                 }
              } 
           
              this.state.ipfscontract.methods.setResult(ques, sol[1]).send({ from: this.state.account }).then((r) => {

                console.log("result set");
                // this.setState({})
        
              })
         }
        
          
        temp = { "address": details[0], "question": ques, "timestamp": details[2], "label": false, "result": ressolver }
      

        }
      questions.push(temp);





    }
    this.setState({ questions: questions });
    var abc = this.state.finalobj;
    abc.cardofquestion = questions;
    abc.type = this.state.roleValue;
    this.setState({ finalobj: abc, loader: false, openSnackBar: true, messageSnackBar: "Entries Found" });

  }
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      rolescontract: null,
      ipfscontract: null,
      web3: null,
      paymentDialog: false,
      roleValue: "",
      c: [],
      postReward: "",
      buffer: null,
      account: null,
      yes: "false",
      finalobj: { cardofquestion: [], type: "" },
      loader: true,
      openSnackBar: false,
      messageSnackBar: ""

    }
  }

  getRoles = () => {
    if (this.state.roleValue === "Publisher") {
      //regPublisherVerify();
    }
    // else if(this.state.roleValue==="Voter")
    //  {
    //   regVoterVerify();
    //  }
    //  else if(this.state.roleValue==="Voter")
    //  { 
    //    regSolverVerify();

    //  }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }

  }

  onSubmit = (event) => {
    // console.log(this.state.contract);
    ipfs.add(this.state.buffer, (error, result) => {
      var today = new Date();

      var date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
      this.state.ipfscontract.methods.publisherUploadQues(result[0].hash, this.state.postReward, date).send({ from: this.state.account }).then((r) => {

        return window.location.reload();
        // this.setState({})

      })
      if (error)
        console.log(error);


    })


  }
  render() {
    console.log(this.state);

    return (
      <div style={{ backgroundColor: "#E6F9F9" }}>
        <Grid container>
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
                <Button style={btn} onClick={() => {
                  this.setState({
                    paymentDialog: true
                  })
                }}>
                  Get Roles
                  </Button>
                <Button style={btn} onClick={() => {
                  this.setState({
                    paymentDialog: true
                  })
                }}>
                  Transfer To Matic
                  </Button>
                <Button style={btn}>Profile</Button>
                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>

          </AppBar>
          <Grid container justify="center" spacing={2} item xs={12} md={12}>
            <Grid item xs={8} md={8}>
              <br />
              <Card style={{ borderRadius: 10 }} >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="title" color="inherit" >
                        {"Upload Your Question :-"}
                        <input type="file" onChange={this.captureFile} />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>

                      <TextField
                        label="Upload Reward"
                        variant="outlined"
                        required
                        type="number"
                        value={this.state.postReward}
                        onChange={(e) => { this.setState({ postReward: e.target.value }) }}

                      />
                    </Grid>
                    <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
                      {
                        this.state.roleValue === "Publisher" &&
                        <Button
                          style={{ marginTop: -30 }} color="primary" variant="outlined" onClick={this.onSubmit} >
                          Post
                       </Button>
                      }

                    </Grid>
                  </Grid>




                </CardContent >
              </Card >

            </Grid>
            <Grid item xs={8} md={8}>


              {this.state.questions.length > 0 && <span>
                {this.state.questions.map(s => (
                  <div>
                    <QuestionsCard
                      data={s}
                      type={this.state.roleValue}
                    />
                    <br />
                  </div>

                ))}</span>}
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          style={{ backgroundColor: "blue" }}
          open={this.state.paymentDialog}
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
                this.setState({ paymentDialog: false });
                this.loadBlockchainData()
              }}
              color="primary"
              variant="outlined"
            >
              Close
          </Button>
            <Button
              onClick={() => {
                this.setState({ paymentDialog: false });
                this.getRoles()
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
      </div >

    )
  }
}