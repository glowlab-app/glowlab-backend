const networks = {
    godwoken_testnet: {
        rpc: 'https://godwoken-testnet-v1.ckbapp.dev',
        contracts: {
            marketplace: '0xcedc1a9b6a3b0266f00d2e4198da6b6e434896ea',
			erc1155: '0xa87071a188e3e8d3e30f53a335ecc329d88026b7',
			utility: '0xf4505324d161551550fe33fc2bd0fB5f2bb1c0c0',
        },
        useCache: true,
    },
    godwoken_mainnet: {
        rpc: 'https://godwoken-testnet-v1.ckbapp.dev',
        contracts: {
            marketplace: '0xcedc1a9b6a3b0266f00d2e4198da6b6e434896ea',
			erc1155: '0xa87071a188e3e8d3e30f53a335ecc329d88026b7',
			utility: '0xf4505324d161551550fe33fc2bd0fB5f2bb1c0c0',
        },
        useCache: true,
    }
}

module.exports = {
    networks,
    defaultNetwork: process.env.DEFAULT_NETWORK || 'godwoken_mainnet'
}