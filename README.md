# 🌐 Blockchain World: Key Terms

### 📜 Blockchain
A blockchain is a decentralized, distributed ledger that records transactions across many computers. It ensures transparency, security, and immutability of data without the need for a central authority.

**Diagram:**
```
[Transaction] -> [Block] -> [Block] -> [Block] -> ...
```
Each block contains a list of transactions and is linked to the previous block, forming a chain.

---

### 💻 Ethereum
Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (dApps). It uses its own cryptocurrency called Ether (ETH) to power transactions and computations.

**Key Features:**
- Smart Contracts 🤖
- Decentralized Applications (dApps) 🌍
- Ether (ETH) 💰

---

### 🛠️ Solidity
Solidity is a high-level programming language used to write smart contracts on the Ethereum blockchain. It is statically typed and designed to target the Ethereum Virtual Machine (EVM).

**Example Code:**
```solidity
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
```

---

### 🌐 Web3
Web3 refers to a collection of libraries and tools that allow developers to interact with the Ethereum blockchain. It enables functionalities like sending transactions, reading data, and deploying smart contracts.

**Example Usage:**
```javascript
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

web3.eth.getAccounts().then(console.log);
```
