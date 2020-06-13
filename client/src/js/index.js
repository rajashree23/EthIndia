import Web3 from "web3";
import { rolesABI } from "../js/roles";

//Matic requirement
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs").default;
const config = require("./Config.json");
//express requirement
// var express = require("express");
// var app = express();
var bodyParser = require("body-parser");
//Web3 and metamask

// const MetaMaskConnector = require("node-metamask");
const delay = require('delay');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

//inject web3 into metamask





// if (window.ethereum) {
//   window.web3 = new Web3(window.ethereum)
//   await window.ethereum.enable()
// }
// else if (window.web3) {
//   window.web3 = new Web3(window.web3.currentProvider)
// }
// else {
//   window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
// }

// const web3 = window.web3
// // Load account
// const accounts = await web3.eth.getAccounts()

// const rolescontract = new web3.eth.Contract(rolesABI,"0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe")




// const web3 = window.web3
// // Load account
// const fromAcc = await web3.eth.getAccounts()



// const rolescontract = new web3.eth.Contract(rolesABI, "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe")

// // // Importing required dependenties

// const network = new Network(config.network, config.version); //network configuration
// const MaticNetwork = network.Matic;
// const MainNetwork = network.Main;

// const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
// const Matic_Erc20Address = config.Matic_Erc20Address;
// const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
// const Matic_Erc721Address = config.Matic_Erc721Address;

// //const from = account.toString(); // from address

// const matic = new Matic({
//   maticProvider: connector.getProvider(),
//   parentProvider: MainNetwork.RPC,
//   rootChain: MainNetwork.Contracts.RootChain,
//   withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
//   depositManager: MainNetwork.Contracts.DepositManagerProxy,
//   registry: MainNetwork.Contracts.Registry,
// });

// async function init() {
//   await matic.initialize();

// }
// //function to fetch default account
// async function getAccount(){
// 	var account =await web3.eth.getAccounts()
// 	console.log(account.toString())
// 	return account.toString()
// }
// //to initiate the matic 
// init();

async function checkBal() {
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
  
  const network = new Network(config.network, config.version); //network configuration
  const MaticNetwork = network.Matic;
  const MainNetwork = network.Main;
  
  const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
  const Matic_Erc20Address = config.Matic_Erc20Address;
  const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
  const Matic_Erc721Address = config.Matic_Erc721Address;
  
  //const from = account.toString(); // from address
  
  const matic = new Matic({
    // maticProvider: connector.getProvider(),
    parentProvider: MainNetwork.RPC,
    rootChain: MainNetwork.Contracts.RootChain,
    withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
    depositManager: MainNetwork.Contracts.DepositManagerProxy,
    registry: MainNetwork.Contracts.Registry,
  });
  
  async function init() {
    await matic.initialize();
  
  }
  init();
  
  
  
  const web3 = window.web3
  const from = await web3.eth.getAccounts()
  
  
  var k = await matic.balanceOfERC20(from, Matic_Erc20Address, { from })
  console.log(k);
  return k;
}


async function tokenTransDeployer(amo){
  const network = new Network(config.network, config.version); //network configuration
  const MaticNetwork = network.Matic;
  const MainNetwork = network.Main;
  
  const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
  const Matic_Erc20Address = config.Matic_Erc20Address;
  const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
  const Matic_Erc721Address = config.Matic_Erc721Address;
  
  //const from = account.toString(); // from address
  
  const matic = new Matic({
    // maticProvider: connector.getProvider(),
    parentProvider: MainNetwork.RPC,
    rootChain: MainNetwork.Contracts.RootChain,
    withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
    depositManager: MainNetwork.Contracts.DepositManagerProxy,
    registry: MainNetwork.Contracts.Registry,
  });
  
  async function init() {
    await matic.initialize();
  
  }
  //function to fetch default account
  async function getAccount(){
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
    
     
    
    
    
    const web3 = window.web3
    var account =await web3.eth.getAccounts()
    console.log(account.toString())
    return account.toString()
  }
  //to initiate the matic 
  init();
	var recipient = "0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB";
	var from = await getAccount()
  var amount = amo
  var token = Matic_Erc20Address;
  const x = await matic.transferERC20Tokens(token, recipient, amount, {from})
  console.log(`${x} is the output`)
	if(x.transactionHash!=null)
	return true
	else return false
}

async function regPublisherVerify() {//Register and verify publisher

  // if (window.ethereum) {
  //   window.web3 = new Web3(window.ethereum)
  //   await window.ethereum.enable()
  // }
  // else if (window.web3) {
  //   window.web3 = new Web3(window.web3.currentProvider)
  // }
  // else {
  //   window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  // }

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
  
   
  
  
  
  const web3 = window.web3
  // Load account
  const fromAcc = await web3.eth.getAccounts()
  
  
  
  const rolescontract = new web3.eth.Contract(rolesABI, "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe")
  
  // // Importing required dependenties
  
  // const network = new Network(config.network, config.version); //network configuration
  // const MaticNetwork = network.Matic;
  // const MainNetwork = network.Main;
  
  // const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
  // const Matic_Erc20Address = config.Matic_Erc20Address;
  // const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
  // const Matic_Erc721Address = config.Matic_Erc721Address;
  
  // //const from = account.toString(); // from address
  
  // const matic = new Matic({
  //   maticProvider: connector.getProvider(),
  //   parentProvider: MainNetwork.RPC,
  //   rootChain: MainNetwork.Contracts.RootChain,
  //   withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
  //   depositManager: MainNetwork.Contracts.DepositManagerProxy,
  //   registry: MainNetwork.Contracts.Registry,
  // });
  
  // async function init() {
  //   await matic.initialize();
  
  // }
  // //function to fetch default account
  // async function getAccount(){
  //   var account =await web3.eth.getAccounts()
  //   console.log(account.toString())
  //   return account.toString()
  // }
  // //to initiate the matic 
  // init();
  
   

  const bal = await checkBal()
  // const fromAcc = await getAccount()
  console.log(fromAcc)
  if (bal >= 10000) {
    const out = await tokenTransDeployer(10000 / (10 ^ 8))//in matic network
    await delay(50000)//Delay to change network from Matic to Ropston
    if (out) {//in ropston network
      const x = await rolescontract.methods.addPublisher().send({ from: fromAcc });
      console.log(`${x} from y`);
      const y = await rolescontract.methods.verifyPublisher().call({ from: fromAcc });
      console.log(`${y} from y`);
    }
    else
      console.log("Transaction Failed")
  }
  else {
    console.log("Insufficient Balance to be Publisher")
  }
}





module.export(regPublisherVerify);
