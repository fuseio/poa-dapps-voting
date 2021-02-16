import { networkAddresses } from './addresses'
import VotingToChangeProxyABI from '../abis/votingAbi.json'

export default class VotingToChangeProxy {
  async init({ web3, netId }) {
    const { VOTING_TO_CHANGE_PROXY_ADDRESS } = networkAddresses(netId)
    console.log('VotingToChangeProxy address', VOTING_TO_CHANGE_PROXY_ADDRESS)

    this.instance = new web3.eth.Contract(VotingToChangeProxyABI, VOTING_TO_CHANGE_PROXY_ADDRESS)
    this.address = VOTING_TO_CHANGE_PROXY_ADDRESS
  }

  //setters
  createBallot({ startTime, endTime, proposedValue, contractType, memo }) {
    if (!this.instance.methods.createBallot) {
      return this.instance.methods
        .createBallotToChangeProxyAddress(startTime, endTime, proposedValue, contractType, memo)
        .encodeABI()
    }
    return this.instance.methods.createBallot(startTime, endTime, contractType, memo, proposedValue).encodeABI()
  }

  vote(_id, choice) {
    return this.instance.methods.vote(_id, choice).encodeABI()
  }

  finalize(_id) {
    return this.instance.methods.finalize(_id).encodeABI()
  }

  //getters
  doesMethodExist(methodName) {
    if (this.instance.methods[methodName]) {
      return true
    }
    return false
  }

  nextBallotId() {
    return this.instance.methods.getNextBallotId().call()
  }

  getBallotInfo(_id, _votingKey) {
    if (this.doesMethodExist('getBallotInfo')) {
      return this.instance.methods.getBallotInfo(_id, _votingKey).call()
    }
    return this.instance.methods.votingState(_id).call()
  }

  getMinThresholdOfVoters(_id) {
    if (this.doesMethodExist('getMinThresholdOfVoters')) {
      return this.instance.methods.getMinThresholdOfVoters(_id).call()
    }
    return null
  }

  hasAlreadyVoted(_id, votingKey) {
    return this.instance.methods.hasAlreadyVoted(_id, votingKey).call()
  }

  isValidVote(_id, votingKey) {
    return this.instance.methods.isValidVote(_id, votingKey).call()
  }

  isActive(_id) {
    return this.instance.methods.isActive(_id).call()
  }

  canBeFinalizedNow(_id) {
    if (this.doesMethodExist('canBeFinalizedNow')) {
      return this.instance.methods.canBeFinalizedNow(_id).call()
    }
    return null
  }

  async getBallotLimit(_miningKey, _limitPerValidator) {
    const _activeBallots = await this.instance.methods.validatorActiveBallots(_miningKey).call()
    return _limitPerValidator - _activeBallots
  }

  minBallotDuration() {
    return this.instance.methods.getMinBallotDurationCycles().call()
  }

  getBalletLimitPerValidator() {
    return this.instance.methods.getBallotLimitPerValidator().call()
  }

  maxLimitOfBallots() {
    return this.instance.methods['MAX_LIMIT_OF_BALLOTS']().call()
  }

  getVoterChoice(id, key) {
    return this.instance.methods.getVoterChoice(id, key).call()
  }

  isValidVotingKey(key) {
    return this.instance.methods.isValidVotingKey(key).call()
  }
}
