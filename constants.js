const networks = {
    evmos_testnet: {
        rpc: 'https://eth.bd.evmos.dev:8545',
        contracts: {
            marketplace: '0xaC3c382A8c9c1b58f0e1d8fecf4B520f6Be833AC',
			erc1155: '0xcCB22CdA4857E1665dE3043FF77ff125c9E0A2A7',
			utility: '0x15D45AE2f71C708d4dc85e95961d528fdfbbCca4',
        },
        useCache: true,
    },
    evmos_mainnet: {
        rpc: 'https://eth.bd.evmos.org:8545',
        contracts: {
            marketplace: '0xaC3c382A8c9c1b58f0e1d8fecf4B520f6Be833AC',
			erc1155: '0xcCB22CdA4857E1665dE3043FF77ff125c9E0A2A7',
			utility: '0x15D45AE2f71C708d4dc85e95961d528fdfbbCca4',
        },
        useCache: true,
    }
}

module.exports = {
    networks,
    defaultNetwork: process.env.DEFAULT_NETWORK || 'evmos_mainnet'
}