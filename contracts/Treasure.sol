// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title Treasure Contract
 * @dev A contract that allows depositors to participate in a treasure hunt by making a deposit and revealing a secret word.
 */
contract Treasure {
    mapping(address => bool) public Deposits;
    mapping(address => bytes32) public commit;

    bytes32 public secretWord;
    address public winner;

    /**
     * @dev Initializes the contract with a secret word.
     * @param _secretWord The secret word required to claim the treasure.
     */
    constructor(bytes32 _secretWord) {
        secretWord = _secretWord;
    }

    /**
     * @dev Modifier to restrict access to only depositors.
     */
    modifier onlyDepositor() {
        require(Deposits[msg.sender] == true, "Not a Depositor");
        _;
    }

    /**
     * @dev Allows users to deposit ether to participate in the treasure hunt.
     * Users can deposit only once and must send a minimum of 1 ether.
     */
    function deposit() public payable {
        if (Deposits[msg.sender] == false) {
            if (msg.value >= 1 ether) {
                Deposits[msg.sender] = true;
            } else {
                revert("Value deposited is less than 1 ether");
            }
        } else {
            revert("Already deposited");
        }
    }

    /**
     * @dev Stores a commitment for the secret word by the depositor.
     * @param _complexKey The complex key (bytes32) representing the commitment.
     */
    function commitment(bytes32 _complexKey) public onlyDepositor {
        commit[msg.sender] = _complexKey;
    }

    /**
     * @dev Allows depositors to reveal the secret word and claim the treasure.
     * If the revealed word matches the stored commitment and the secret word,
     * the depositor becomes the treasure's owner and can claim the contract's balance.
     * @param word The word revealed by the depositor.
     */
    function revealWord(string memory word) public payable onlyDepositor {
        if (
            keccak256(abi.encodePacked(msg.sender, word)) == commit[msg.sender]
        ) {
            if (keccak256(abi.encodePacked(word)) == secretWord) {
                winner = msg.sender;
                (bool success, bytes memory returnedData) = winner.call{
                    value: address(this).balance
                }("");
                Address.verifyCallResult(success, returnedData, "Error");
            } else {
                revert("Incorrect Word");
            }
        } else {
            revert("Incorrect key");
        }
    }
}
