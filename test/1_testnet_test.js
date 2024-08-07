const OfferManager = artifacts.require("OfferManager");
const LoanManager = artifacts.require("LoanManager");
const FeeManager = artifacts.require("FeeManager");

const LendingPool = artifacts.require("LendingPool");

const PriceFeed = artifacts.require("PriceFeed");

const Activity = artifacts.require("Activity");
const ZapsterScore = artifacts.require("ZapsterScore");
const LoanToValueRatio = artifacts.require("LoanToValueRatio");

const BTCB = ""
const WETH = ""
const BUSD = ""
const USDC = ""
const STONE = ""
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

contract("CreateLendingOffer", async accounts => {
    it("setValues", async () => {
        const priceFeed = await PriceFeed.deployed()
        await priceFeed.addPriceFeed(NATIVE, "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526")
        await priceFeed.addPriceFeed(BTCB, "0x5741306c21795FdCBb9b265Ea0255F499DFe515C")
        await priceFeed.addPriceFeed(WETH, "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7")
        await priceFeed.addPriceFeed(BUSD, "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa")
        await priceFeed.addPriceFeed(USDC, "0x90c069C4538adAc136E051052E14c1cD799C41B7")
        await priceFeed.addPriceFeed(STONE, "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7")
        await priceFeed.addUSDFeed("0x90c069C4538adAc136E051052E14c1cD799C41B7")
    })
    it("setValues 2", async () => {
        const ltv = await LoanToValueRatio.deployed()
        await ltv.setZapsterScore(ZapsterScore.address, 100, 120)

        const zapsterScore = await ZapsterScore.deployed()
        await zapsterScore.setActivity(Activity.address)

        const offerManager = await OfferManager.deployed()
        await offerManager.setLendingPool(LendingPool.address)

        const loanManager = await LoanManager.deployed()
        await loanManager.setLendingPool(LendingPool.address)

        const feeManager = await FeeManager.deployed()
        await feeManager.setLendingPool(LendingPool.address)

        const activity = await Activity.deployed()
        await activity.setLendingPool(LendingPool.address)
    })
    it("setValues 3", async function () {
        const lendingPool = await LendingPool.deployed()
        await lendingPool.setFeeds(
            LoanToValueRatio.address,
            Activity.address,
            PriceFeed.address
        )
        await lendingPool.setManagers(
            LoanManager.address,
            OfferManager.address,
            FeeManager.address
        )
    })
})