const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require("../inbox/compile")

let accounts, inbox

const INITIAL_MESSAGE = "Hi there!"

beforeEach(async () => {
	accounts = await web3.eth.getAccounts()
	// inbox is a smart contract that we are deploying to the Ethereum blockchain.
	// It represents the real world contract which is deployed to the blockchain.
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
		// Gas is the amount of computational work required to execute a transaction.
		// Gas price is the amount of Ether you are willing to pay per unit of gas
		// Here we set a high gas limit and a gas price to ensure the transaction is
		// processed quickly on the network.
		.send({ from: accounts[0], gas: "1000000", gasPrice: "20000000000" })
})

describe("Inbox Contract", () => {
	it("deploys a contract", () => {
		// This test checks if the contract is deployed successfully by asserting that
		// the address of the deployed contract is not null or undefined.
		assert.ok(inbox.options.address)
	})

	it("has a default message", async () => {
		// This test checks if the initial message in the contract is set correctly.
		const message = await inbox.methods.message().call()
		assert.strictEqual(message, INITIAL_MESSAGE)
	})

	it("can change the message", async () => {
		// This test checks if the message can be changed successfully.
		const newMessage = "Hello, World!"
		await inbox.methods
			.setMessage(newMessage)
			.send({ from: accounts[0], gas: "1000000", gasPrice: "20000000000" })
		const message = await inbox.methods.message().call()
		assert.strictEqual(message, newMessage)
	})
})
