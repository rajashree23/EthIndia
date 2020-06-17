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
    var amount = k;//req.body.value ; // amount in wei
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
  
    //const from = account.toString(); // from address
  
    const matic = new Matic({
      maticProvider: window.web3,
      parentProvider: window.web3,
      rootChainAddress: config.ROOTCHAIN_ADDRESS,
      syncerUrl: config.SYNCER_URL,
      watcherUrl: config.WATCHER_URL,
    })
    async function init() {
      await matic.initialize();
      await matic.setWallet(config.privateKey)
    }
    init();
    async function getAccount() {
      var account = await window.web3.eth.getAccounts()
      console.log(account.toString())
      return account.toString()
    }
  
  
    var token = Ropsten_Erc20Address;
    var from =await getAccount()
     const out1=await matic.approveERC20TokensForDeposit(token, amount, { from }) //to get approval from matic contract in Main chain
      console.log(out1)
    const out2=  await matic.depositERC20ForUser(token, from, amount, { from}) // Tokens released from the mainnet to the matic network
      console.log(out2) 
      
  }
  
  