//Matic requirement
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs").default;
const config = require("./Config.json");
//express requirement
// var express = require("express");
// var app = express();
var bodyParser = require("body-parser");
//Web3 and metamask
const Web3 = require("web3");
const MetaMaskConnector = require("node-metamask");
const delay = require('delay');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

//inject web3 into metamask
const connector = new MetaMaskConnector({
	port: 3333, // this is the default port
	onConnect() {
	  console.log("MetaMask client connected");
	}, // Function to run when MetaMask is connected (optional)
  });
  connector.start().then(() => {
    //after starting, set the web3 provider to metamask
  const web3 = new Web3(connector.getProvider());
  const contractAddress = "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe";
  const contractABI = [
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_newAdmin",
          type: "address",
        },
      ],
      name: "addAdmins",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "addPublisher",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "addSolver",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "addVoter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "verifyPublisher",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "verifySolver",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "verifyVoter",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];
  var contract = new web3.eth.Contract(contractABI, contractAddress);


// Importing required dependenties

const network = new Network(config.network, config.version); //network configuration
const MaticNetwork = network.Matic;
const MainNetwork = network.Main;

const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
const Matic_Erc20Address = config.Matic_Erc20Address;
const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
const Matic_Erc721Address = config.Matic_Erc721Address;

//const from = account.toString(); // from address

const matic = new Matic({
  maticProvider: connector.getProvider(),
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
	var account =await web3.eth.getAccounts()
	console.log(account.toString())
	return account.toString()
}
//to initiate the matic 
init();

//to check balance
async function checkBal(){
	const from =await getAccount()
  var k = await matic.balanceOfERC20(from, Matic_Erc20Address, {from})
  console.log(k);
  return k;

}

//to transfer matic token from Ropston to matic
async function tranEthtoTok(k){
  var amount = k;//req.body.value ; // amount in wei
  var token = Ropsten_Erc20Address;
  var from =await getAccount()
   const out1=await matic.approveERC20TokensForDeposit(token, amount, { from }) //to get approval from matic contract in Main chain
    console.log(out1)
  const out2=  await matic.depositERC20ForUser(token, from, amount, { from}) // Tokens released from the mainnet to the matic network
    console.log(out2) 
    
}

//to transfer token to deployer from the default account
async function tokenTransDeployer(amo){
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

//to transfer token from publisher to the the group of address
async function batchTransfer(from,to,eachAmt){
  var token = Matic_Erc20Address;
  from = from.toString()
  var transHash=[];
  for(let i=0;i<to.length;i++){
    const x= await matic.transferERC20Tokens(token,to[i].toString(),eachAmt,{from})
    transHash.push({x:to[i]});//pushes array of object consisting of transaction hash and the address
  }
  return transHash
}

// "0xEc5C207897C4378658F52bCCCE0ea648D1f17D65"(RopERC20)
//0xBc0AEe9f7b65fd3d8be30ba648e00dB5F734942b(maticERC20)

//publisher->10000
//solver->200
//voter->1000

//To add admins
async function addAdmis(admin){//Add admins
  //In Ropston  not matic
  var deployer = await getAccount()
  const x= await contract.methods.addAdmins(admin.toString()).send({from:deployer})
  console.log(x)
}

//To register and verify publisher
async function regPublisherVerify() {//Register and verify publisher
  const bal = await checkBal()
  const fromAcc = await getAccount()
  console.log(fromAcc)
	if(bal>=10000){
    const out = await tokenTransDeployer(10000/(10^8))//in matic network
    await delay(50000)//Delay to change network from Matic to Ropston
		if(out){//in ropston network
    		const x = await contract.methods.addPublisher().send({from:fromAcc});
    		console.log(`${x} from y`);
    		const y = await contract.methods.verifyPublisher().call({from:fromAcc});
			console.log(`${y} from y`);
}
		else
			console.log("Transaction Failed")
}
	else
	{
	console.log("Insufficient Balance to be Publisher")
	}
  }

  //To register and verify Voter
  async function regVoterVerify() {//register and verify voter
  const fromAcc = await getAccount()
	const bal = await checkBal()
	if(bal>=1000){
    const out = await tokenTransDeployer(1000)//in matic network
    await delay(50000)//Delay to change network from Matic to Ropston
		if(out){//in ropston network
    		const x = await contract.methods.addVoter().send({from:fromAcc});
    		console.log(`${x} from y`);
    		const y = await contract.methods.verifyVoter().call({from:fromAcc});
			console.log(`${y} from y`);
}
		else
			console.log("Transaction Failed")
}
	else
	{
	console.log("Insufficient Balance to be Publisher")
	}
  }
//To register and verify Solver
    async function regSolverVerify() {//regoster solver and verify
    const fromAcc = await getAccount()
		const bal = await checkBal()
	if(bal>=200){
    const out = await tokenTransDeployer(200)//in matic network
    await delay(50000)//Delay to change network from Matic to Ropston
		if(out){//in ropston network
    		const x = await contract.methods.addSolver().send({from:fromAcc});
    		console.log(`${x} from x`);
    		const y = await contract.methods.verifySolver().call({from:fromAcc});
			console.log(`${y} from y`);
}
		else
			console.log("Transaction Failed")
}
	else
	{
	console.log("Insufficient Balance to be Publisher")
	}
    }
  
/* To remove roles
async function remSol(culprit){
  adminAdd = await getAccount()
  const x= await contract.methods.removeSolver(culprit.toString()).send({from:adminAdd})
  console.log(x)
}

async function remVot(culprit){
  adminAdd = await getAccount()
  const x= await contract.methods.removeVoter(culprit.toString()).send({from:adminAdd})
  console.log(x)
}

async function remPub(culprit){
  adminAdd = await getAccount()
  const x= await contract.methods.removeSolver(culprit.toString()).send({from:adminAdd})
  console.log(x)
}
*/



module.exports(regPublisherVerify,regSolverVerify,regVoterVerify);

});


