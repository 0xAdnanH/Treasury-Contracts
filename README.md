**The Treasure contract is a Solidity smart contract that allows depositors to participate in a treasure hunt by making a deposit and revealing a secret word.
If a depositor successfully reveals the secret word, they become the owner of the treasure and can claim the contract's balance.

**Features and Functionality :
Depositors can make a deposit by sending a minimum of 1 ether to the contract.
Each depositor can deposit only once.
Depositors must store a commitment for the secret word using a complex key.
Depositors can reveal the secret word to claim the treasure if the revealed word matches their stored commitment and the secret word.
The contract's balance can be claimed by the winner who successfully reveals the secret word.
