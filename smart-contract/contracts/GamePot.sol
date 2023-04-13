// contracts/GamePot.sol

pragma solidity ^0.8.0;

contract GamePot {
    address payable public companyWallet;
    uint256 public potAmount;
    uint256 public lastWithdrawal;

    constructor(address payable _companyWallet) {
        companyWallet = _companyWallet;
        lastWithdrawal = block.timestamp;
    }

    function deposit() public payable {
        require(msg.value > 0, "No value deposited");
        potAmount += msg.value;
    }

    function withdraw(address payable winner) external {
        require(msg.sender == companyWallet, "Only the company can initiate withdrawal");
        require(block.timestamp >= lastWithdrawal + 1 days, "24 hours must pass between withdrawals");
        
        uint256 companyFee = (potAmount * 5) / 100;
        uint256 winnerAmount = potAmount - companyFee;
        
        companyWallet.transfer(companyFee);
        winner.transfer(winnerAmount);
        
        lastWithdrawal = block.timestamp;
        potAmount = 0;
    }
}

