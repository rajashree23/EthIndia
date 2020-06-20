
import Web3 from "web3";
import { rolesABI } from "../js/roles";

// var bodyParser = require("body-parser");
//Web3 and metamask
//const MetaMaskConnector = require("node-metamask");

const delay = require('delay');
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs");
const config = require("./Config.json");
// const connector = new MetaMaskConnector({
// 	port: 3333, // this is the default port
// 	onConnect() {
// 	  console.log("MetaMask client connected");
// 	}, // Function to run when MetaMask is connected (optional)
//   });
//const Web3 = require("web3");
export default async function regPublisherVerify() {
  var y;
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  loadWeb3();

  //const web3 = new Web3(connector.getProvider());
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
    //await matic.setWallet(config.privateKey)
  }
  init();
  async function getAccount() {
    var account = await window.web3.eth.getAccounts()
    console.log(account.toString())
    return account.toString()
  }

  async function checkBal() {
    const from = await getAccount()
    var k = await matic.balanceOfERC20(from, Matic_Erc20Address, { from })
    console.log(k);
    return k;

  }
  async function tokenTransDeployer(amo) {
    var recipient = "0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB";
    var from = await getAccount()
    var amount = amo
    var token = Matic_Erc20Address;
    const x = await matic.transferERC20Tokens(token, recipient, amount, { from })
    console.log(x);
    if (x.transactionHash != null)
      return true
    else return false
  }


  async function reg() {
    window.ethereum.autoRefreshOnNetworkChange = false;
    const bal = await checkBal()
    const fromAcc = await getAccount()
    console.log(fromAcc)
    if (bal >= 5000000000000) {
      const out = await tokenTransDeployer(5000000000000)//in matic network
      //Delay to change network from Matic to Ropston
      console.log(out)
      if (out) {//in ropston network
        await delay(5000)
        console.log("Change to Ropstone")
        await delay(5000)
        window.ethereum.autoRefreshOnNetworkChange = false;
        console.log("network changed");
        await delay (5000)
        const x = await contract.methods.addSolver().send({ from: fromAcc ,chainId: 3});
        console.log(`${x} from x`);
        
        y = await contract.methods.verifySolver().call({ from: fromAcc ,chainId: 3});
        console.log(`${y} from y`);
      }
      else
        console.log("Transaction Failed")
    }
    else {
      console.log("Insufficient Balance to be Solver")
    }
  }

  reg()

  return y;



}


