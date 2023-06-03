## Installation

### cloning the repository

Alternatively you can also clone the repository and install its dependencies to start using the smart contracts.

```bash
$ git clone https://github.com/0xAdnanH/Treasury-Contracts.git
$ cd ./Treasury-Contracts
$ npm install
```


## Explanation 

The treasury contract has a risk of Front Run attacks , so it uses the commit-reveal-scheme to prevent this security case .

Participants should deposit minimum 1 ether to participate in the competition . The winner will get all the eth in the contract if he knows the secret word that its hash is set in the constructor .  
