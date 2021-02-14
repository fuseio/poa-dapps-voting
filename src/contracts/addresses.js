const VOTING_CONTRACT_ADDRESS = process.env.REACT_APP_VOTING_CONTRACT_ADDRESS

if (typeof VOTING_CONTRACT_ADDRESS === 'undefined') {
  throw new Error('REACT_APP_VOTING_CONTRACT_ADDRESS not set in .env')
}

const CONSENSUS_CONTRACT_ADDRESS = process.env.REACT_APP_CONSENSUS_CONTRACT_ADDRESS

if (typeof CONSENSUS_CONTRACT_ADDRESS === 'undefined') {
  throw new Error('REACT_APP_CONSENSUS_CONTRACT_ADDRESS not set in .env')
}

const FUSE_ADDRESSES = {
  VOTING_TO_CHANGE_PROXY_ADDRESS: VOTING_CONTRACT_ADDRESS,
  POA_ADDRESS: CONSENSUS_CONTRACT_ADDRESS
}

function networkAddresses(chainId) {
  switch (chainId) {
    default:
      return FUSE_ADDRESSES
  }
}

module.exports = {
  networkAddresses
}
