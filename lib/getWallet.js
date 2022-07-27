const getNetwork = require ('./getNetwork');

// const { PolyjuiceJsonRpcProvider } = require ("@polyjuice-provider/ethers");
// const ERC1155ABI = require ('../contracts/SqwidERC1155.js').ABI;
// const MarketplaceABI = require ('../contracts/SqwidMarketplace.js').ABI;
// const UtilityABI = require ('../contracts/SqwidUtility.js').ABI;
const ethers = require ('ethers');
// const Web3 = require ('web3');

// const web3 = new Web3(getNetwork().rpc);
// console.log (web3);
const provider = new ethers.providers.JsonRpcProvider(getNetwork().rpc);
// const polyjuiceConfig = {
//     web3Url: getNetwork ().rpc,
// };

// const provider = new PolyjuiceJsonRpcProvider (polyjuiceConfig, polyjuiceConfig.web3Url);

// provider.setMultiAbi ([ ERC1155ABI, MarketplaceABI, UtilityABI ]);

const setup = async () => {
    return {
        provider
    }
}

exports.getWallet = setup;