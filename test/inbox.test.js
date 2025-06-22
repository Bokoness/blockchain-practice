const assert = require("assert")
const ganache = require("ganache-cli")
const { Web3 } = require("web3")
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require("../compile")

let accounts, inbox

beforeEach(async () => {
	accounts = await web3.eth.getAccounts()
	// inbox is a smart contract that we are deploying to the Ethereum blockchain.
	// It represents the real world contract which is deployed to the blockchain.
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ["Hi there!"] })
		// Gas is the amount of computational work required to execute a transaction.
		// Gas price is the amount of Ether you are willing to pay per unit of gas
		// Here we set a high gas limit and a gas price to ensure the transaction is
		// processed quickly on the network.
		.send({ from: accounts[0], gas: "1000000", gasPrice: "20000000000" })
})

describe("Inbox Contract", () => {
	it("deploys a contract", () => {
		console.log(inbox)
	})
})
