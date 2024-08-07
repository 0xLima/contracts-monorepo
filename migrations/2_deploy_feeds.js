const Activity = artifacts.require("Activity")
const PriceFeed = artifacts.require("PriceFeed")
const ZapsterScore = artifacts.require("ZapsterScore")
const LoanToValueRatio = artifacts.require("LoanToValueRatio")

module.exports = async function (deployer, network, accounts) {
    if (network == "testnet_test") return;
    
    await deployer.deploy(PriceFeed)
    await deployer.deploy(Activity)
    await deployer.deploy(ZapsterScore)
    await deployer.deploy(LoanToValueRatio)
};