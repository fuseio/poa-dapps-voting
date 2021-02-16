import { networkAddresses } from './addresses'
import consensusABI from '../abis/consensusAbi.json'

export default class PoaConsensus {
  async init({ web3, netId }) {
    const { POA_ADDRESS } = networkAddresses()
    console.log('POA address', POA_ADDRESS)

    this.instance = new web3.eth.Contract(consensusABI, POA_ADDRESS)
  }

  async getValidators() {
    return await this.instance.methods.getValidators().call()
  }

  isValidator(votingKey) {
    return this.instance.methods.isValidator(votingKey).call()
  }
}
