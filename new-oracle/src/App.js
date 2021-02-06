import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";

//URL to connect with Metamask, Ganache and Remix
var url = "HTTP://127.0.0.1:7545";
//ABI of the contract
var abi = [
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			}
		],
		"name": "setStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockVolume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



function App(){

  async function clickHandler(e){
    e.preventDefault();
    let provider = new Web3(new Web3.providers.HttpProvider(url));
    provider.eth.getAccounts((error, result) => {
    console.log("Address", result);
  });
  //From metamask
  let AddressOwner = "0x5a88675FF765fDee70641136650d77bf0849E5C8";
  //From Remix
  let contractAddress = "0xc4398F90a788a2F616d4CdBcFA52de885E4ab18E";
  let contractInstance = new provider.eth.Contract(abi, contractAddress);
  console.log("Contract instance", contractInstance);

  let result = await fetch("http://localhost:8000/");
  let json = await result.json();
  console.log(`Price: ${json.price}`);
  console.log(`Volume: ${json.volume}`);

  //Call the contract to set a stock
  let symbol = "0x41424344";
  contractInstance.methods.setStock(symbol, parseInt(json.price), parseInt(json.volume)).send({from: AddressOwner}).on('receipt', () => {
    console.log("set stock");    
  });

  //Call the contract to get the stock price
  contractInstance.methods.getStockPrice(symbol).send({from: AddressOwner}).then(val => {
    console.log("get stock price", val);    
  });

  //Call the contract to get the stock volume
  contractInstance.methods.getStockVolume(symbol).send({from: AddressOwner}).then(val => {
    console.log("get stock volume", val);    
  });
}
  return(
    <div className="App">
      <button onClick={clickHandler}> Click me! </button>
    </div>
  );
  }

export default App;