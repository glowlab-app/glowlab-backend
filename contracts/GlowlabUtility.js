let ABI = [
  {
    "inputs": [
      {
        "internalType": "contract IGlowlabMarketplace",
        "name": "marketplace_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "fetchAuctionBids",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "fetchItem",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "positionId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "marketFee",
                "type": "uint256"
              },
              {
                "internalType": "enum IGlowlabMarketplace.PositionState",
                "name": "state",
                "type": "uint8"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.Position[]",
            "name": "positions",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct GlowlabMarketplaceUtil.ItemResponse",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fetchNumberItems",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "fetchPosition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "positionId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "positionCount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.Item",
            "name": "item",
            "type": "tuple"
          },
          {
            "internalType": "address payable",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "marketFee",
            "type": "uint256"
          },
          {
            "internalType": "enum IGlowlabMarketplace.PositionState",
            "name": "state",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "minBid",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "highestBidder",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "highestBid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.AuctionDataResponse",
            "name": "auctionData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalValue",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.RaffleDataResponse",
            "name": "raffleData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "numMinutes",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "lender",
                "type": "address"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.LoanData",
            "name": "loanData",
            "type": "tuple"
          }
        ],
        "internalType": "struct GlowlabMarketplaceUtil.PositionResponse",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IGlowlabMarketplace.PositionState",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "approvedIds",
        "type": "bytes"
      }
    ],
    "name": "fetchPositions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "positionId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "positionCount",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.Item",
            "name": "item",
            "type": "tuple"
          },
          {
            "internalType": "address payable",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "marketFee",
            "type": "uint256"
          },
          {
            "internalType": "enum IGlowlabMarketplace.PositionState",
            "name": "state",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "minBid",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "highestBidder",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "highestBid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.AuctionDataResponse",
            "name": "auctionData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalValue",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalAddresses",
                "type": "uint256"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.RaffleDataResponse",
            "name": "raffleData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "numMinutes",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "lender",
                "type": "address"
              }
            ],
            "internalType": "struct IGlowlabMarketplace.LoanData",
            "name": "loanData",
            "type": "tuple"
          }
        ],
        "internalType": "struct GlowlabMarketplaceUtil.PositionResponse[]",
        "name": "positions",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "fetchRaffleEntries",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "marketplace",
    "outputs": [
      {
        "internalType": "contract IGlowlabMarketplace",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IGlowlabMarketplace",
        "name": "marketplace_",
        "type": "address"
      }
    ],
    "name": "setMarketContractAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

module.exports = {
    ABI
}