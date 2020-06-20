import Web3 from "web3";
import { rolesABI } from "../js/roles";

// var bodyParser = require("body-parser");
//Web3 and metamask
//const MetaMaskConnector = require("node-metamask");

const delay = require('delay');
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs")
const config = require("./Config.json");

export default async function transTok(k){
    //req.body.value ; // amount in wei
    //console.log(amount)
    console.log(k);
    async function loadWeb3() {
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
  
    loadWeb3();
    const contractAddress = "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe";
    const contract = new window.web3.eth.Contract(rolesABI, contractAddress);
  
    const network = new Network(config.network, config.version); //network configuration
const MaticNetwork = network.Matic;
const MainNetwork = network.Main;

const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
const Matic_Erc20Address = config.Matic_Erc20Address;
const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
const Matic_Erc721Address = config.Matic_Erc721Address;
   // const from = account.toString(); // from address
  
    const matic = new Matic({
      maticProvider:window.web3,
      parentProvider: window.web3,
      rootChain: MainNetwork.Contracts.RootChain,
      withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
      depositManager: MainNetwork.Contracts.DepositManagerProxy,
      registry: MainNetwork.Contracts.Registry,
    });
    async function init() {
      await matic.initialize();
      
    }
    init();

    async function getAccount() {
      var account = await window.web3.eth.getAccounts()
      console.log(account.toString())
      return account.toString()
    }
  
    async function trans(){
      var amount = k.toString();
      console.log(amount+" inside")
      console.log("inside trans");
    var token = Ropsten_Erc20Address;
    var from =await getAccount()
    matic
    .approveERC20TokensForDeposit(token, amount, {
  from
  })
  .then(logs => console.log(logs.transactionHash))
    .then(() => {
      matic.depositERC20ForUser(token, from, amount, {
  from
  })
  .then(logs => console.log(logs.transactionHash));
})
    }
     
     trans();
  }
  
  