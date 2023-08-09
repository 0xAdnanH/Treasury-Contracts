Treasury Contracts
==================
Treasury Contracts enables the deployment of a treasury contract with a hashed password, known only by the deployer. 

Subsequently, individuals can deposit a minimum of 1 ether. Depositors are then able to claim the entire contract balance in two steps by discovering the password that generates the originally set hash.

## Goal of the Project

The project has the following goals:

- **Highlight Commit-Reveal Scheme:** Showcase the utilization of the commit-reveal scheme, particularly when users need to submit information that can get identified in the mempool. This approach prevents frontrunning and enhances security.
  
- **Address Centralization Risk:** Emphasize the security risk present in the contract, primarily the centralization risk. Since the deployer already knows the password, there is a potential for **rug-pull**. If the deployer see that the contract have significant funds, they can enter the contest by paying 1 ether and subsequently withdraw all funds, leaving other participants at a loss.

## Technicalities of the Project

- Only **Depositors Can Commit and Reveal:** The contract only permits depositors to participate in the commit and reveal process, where the prize is ultimately sent, restricted using a modifier.
  
- **Minimum Deposit Requirement:** To engage in the contest, a minimum deposit of 1 ether is necessary.

-  **Unit Tests with ethers.js:** The project utilizes `ethers.js` to write unit tests for the contract's functionalities.

- **Contract and Function Documentation:** The contract's functions and overall functionality have been documented using the `nastepc` documentation. Later actual documentation files can be generated from it using a hardhat plugin.

**Note:** This project is designed for educational purposes and to explore the concepts of commit-reveal schemes, security risks, and centralization. It is not intended for deployment in a production environment.

For detailed instructions on deploying, testing, and interacting with the Treasury Contracts, please refer to the project's documentation.

## Installation

### cloning the repository

Alternatively you can also clone the repository and install its dependencies to start using the smart contracts.

```bash
$ git clone https://github.com/0xAdnanH/Treasury-Contracts.git
$ cd ./Treasury-Contracts
$ npm install
```

### Instructions

#### Compile

To Compile the contract run:

```bash
$ npx hardhat compile
```

#### Tests

To run the unit tests:

```bash
$ npx hardhat test
```

