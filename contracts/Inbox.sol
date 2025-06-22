// Solidity version pragma specifies the compiler version to use
pragma solidity ^0.4.17; // This version is compatible with the contract syntax

// Defining the Inbox contract
contract Inbox {
    // Declaring a public state variable of type string
    string public message; // This variable stores the message and is accessible externally
    
    // Constructor function to initialize the contract with an initial message
    function Inbox(string initialMessage) public {
        message = initialMessage; // Sets the initial value of the message variable
    }
    
    // Function to update the message variable
    function setMessage(string newMessage) public {
        message = newMessage; // Updates the message with a new value
    }
}