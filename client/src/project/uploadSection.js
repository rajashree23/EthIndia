import React from "react";
import Web3 from "web3";
import IPFS from '../contracts/IPFS.json';
import ipfs from '../js/ipfs';
import {
  Button,
  IconButton,
  Icon,
  Grid,
  TextField
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default class UploadSection extends React.Component {
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
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      postReward: "",
      contract: null,
      web3: null,
      buffer: null,
      account: null,
    
    }
  }


  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = (event) => {
      console.log("ONSUBMIT section");
      // console.log(this.state.contract);
      ipfs.add(this.state.buffer, (error, result) => {
      console.log('ipfs results', result[0].hash);
      const date= "7-06-2019";
      console.log(date);
      this.state.contract.methods.publisherUploadQues(result[0].hash,this.state.postReward,date).send({ from: this.state.account }).then((r) => {
        
        console.log('ipfs added');
        console.log('redirecting');
        return window.location.reload();

      })
      if (error)
        console.log(error);
    })
    
  }


  render() {
    return (
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
              <Button style={{marginTop:-30}} color="primary" variant="outlined" onClick={this.onSubmit} >
                Post
              </Button>
            </Grid>
          </Grid>




        </CardContent >
      </Card >

    )
  }
}