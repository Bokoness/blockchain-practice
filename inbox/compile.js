// Importing required modules
const path = require("path") // For handling and transforming file paths
const fs = require("fs") // For interacting with the file system
const solc = require("solc") // Solidity compiler

// Resolving the path to the Inbox.sol contract file
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol")

// Reading the content of the Inbox.sol file
const source = fs.readFileSync(inboxPath, "utf8")

// Compiling the Solidity contract using solc
// The second argument '1' specifies the number of contracts to compile
const compiled = solc.compile(source, 1).contracts[":Inbox"]

// Exporting the compiled contract's interface (ABI) and bytecode
module.exports = {
	interface: compiled.interface, // ABI (Application Binary Interface) defines how to interact with the contract
	bytecode: compiled.bytecode, // Bytecode is the compiled version of the contract ready to be deployed
}
