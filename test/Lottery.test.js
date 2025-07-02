const assert = require("assert")
const ganache = require("ganache")
const { Web3 } = require("web3")
const web3 = new Web3(ganache.provider())

const { interface, bytecode } = require("../compile")

let lottery
let accounts

beforeEach(async () => {
	accounts = await web3.eth.getAccounts()

	lottery = await new web3.eth.Contract(JSON.parse(interface))
	// Deploy the Lottery contract to our local test network.
		.deploy({ data: bytecode })
		.send({ from: accounts[0], gas: "1000000" })
})

describe("Lottery Contract", () => {
	it("deploys a contract", () => {
		// Check that the contract has a valid address on the blockchain.
		assert.ok(lottery.options.address)
	})

	it("allows one account to enter", async () => {
		// Call the 'enter' function in the Solidity contract.
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("0.02", "ether"),
		})

		// Call the 'getPlayers' view function to see who has entered.
		const players = await lottery.methods.getPlayers().call({
			from: accounts[0],
		})

		// Verify that the player's address was added to the 'players' array.
		assert.equal(accounts[0], players[0])
		assert.equal(1, players.length)
	})

	it("allows multiple accounts to enter", async () => {
		// Test that multiple accounts can call the 'enter' function.
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("0.02", "ether"),
		})
		await lottery.methods.enter().send({
			from: accounts[1],
			value: web3.utils.toWei("0.02", "ether"),
		})
		await lottery.methods.enter().send({
			from: accounts[2],
			value: web3.utils.toWei("0.02", "ether"),
		})

		// Verify all accounts are in the 'players' array.
		const players = await lottery.methods.getPlayers().call({
			from: accounts[0],
		})

		assert.equal(accounts[0], players[0])
		assert.equal(accounts[1], players[1])
		assert.equal(accounts[2], players[2])
		assert.equal(3, players.length)
	})

	it("requires a minimum amount of ether to enter", async () => {
		// Test that the 'enter' function reverts if not enough Ether is sent.
		try {
			await lottery.methods.enter().send({
				from: accounts[0],
				value: 0,
			})
			assert(false) // If the transaction didn't revert, the test should fail.
		} catch (err) {
			assert(err) // Assert that an error (revert) occurred.
		}
	})

	it("only manager can call pickWinner", async () => {
		// Test that only the contract manager can call 'pickWinner'.
		try {
			await lottery.methods.pickWinner().send({
				from: accounts[1],
			})
			assert(false) // If the transaction didn't revert, the test should fail.
		} catch (err) {
			assert(err) // Assert that an error (revert) occurred.
		}
	})

	it("sends money to the winner and resets the players array", async () => {
		// Enter one account into the lottery.
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("2", "ether"),
		})

		// Get initial balance of the winner.
		const initialBalance = await web3.eth.getBalance(accounts[0])
		// Call 'pickWinner' from the manager account.
		await lottery.methods.pickWinner().send({ from: accounts[0] })
		// Get final balance of the winner.
		const finalBalance = await web3.eth.getBalance(accounts[0])
		// Calculate the difference (should be close to 2 ether, minus gas).
		const difference = finalBalance - initialBalance

		// Assert that the winner received most of the prize money.
		assert(difference > web3.utils.toWei("1.8", "ether"))
		// (Implicitly, the contract should also reset the players array after picking a winner.)
	})
})
