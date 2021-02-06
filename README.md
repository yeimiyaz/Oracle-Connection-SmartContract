# Oracle-Connection-SmartContract
Application to connect an oracle with a smart contract using an express server

To execute the applications, follow the next steps:

0-remix
	a- Deploy the contract Stock.sol in Remix (for the validation setup the environment in Web3 Provider)
	
1-myapp (express server application)
    a- Execute npm install
    b- Execute npm start
    c- Validate the server is deployed in http://localhost:8000

2-new-oracle (oracle that will be connected with express server and then with the contract that hsa been deployed in Remix and Ganache)
    a- Execute npm install
    b- Change the ABI of your contract in line 6
    c- Change the address of the owner in line 88
    d- Change the address of your contract in line 90
    e- Execute npm start
    f- Validate that the application is deployed in http://localhost:3000
    g- Once you click in the botton, check in Ganache that three new transactions were sent and the gas change in Remix and Metamask
