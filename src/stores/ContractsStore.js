import { observable, computed, action } from 'mobx'
import React from 'react'
import moment from 'moment'

import PoaConsensus from '../contracts/PoaConsensus.contract'
import BallotsStorage from '../contracts/BallotsStorage.contract'
import EmissionFunds from '../contracts/EmissionFunds.contract'
import KeysManager from '../contracts/KeysManager.contract'
import ProxyStorage from '../contracts/ProxyStorage.contract'
import VotingToChangeKeys from '../contracts/VotingToChangeKeys.contract'
import VotingToChangeMinThreshold from '../contracts/VotingToChangeMinThreshold.contract'
import VotingToChangeProxy from '../contracts/VotingToChangeProxy.contract'
import VotingToManageEmissionFunds from '../contracts/VotingToManageEmissionFunds.contract'
import ValidatorMetadata from '../contracts/ValidatorMetadata.contract'
import ballotStore from './BallotStore'
import ballotsStore from './BallotsStore'
import commonStore from './CommonStore'
import { BallotKeysCard } from '../components/BallotKeysCard'
import { BallotMinThresholdCard } from '../components/BallotMinThresholdCard'
import { BallotProxyCard } from '../components/BallotProxyCard'
import { BallotEmissionFundsCard } from '../components/BallotEmissionFundsCard'

import 'babel-polyfill'

class ContractsStore {
  @observable poaConsensus
  @observable ballotsStorage
  @observable emissionFunds
  @observable keysManager
  @observable proxyStorage
  @observable votingToChangeKeys
  @observable votingToChangeMinThreshold
  @observable votingToChangeProxy
  @observable votingToManageEmissionFunds
  @observable validatorMetadata
  @observable votingKey
  @observable miningKey
  @observable web3Instance
  @observable validatorsLength
  @observable keysBallotThreshold
  @observable minThresholdBallotThreshold
  @observable proxyBallotThreshold
  @observable emissionFundsBallotThreshold
  @observable ballotCancelingThreshold
  @observable validatorLimits
  @observable minBallotDuration
  @observable validatorsMetadata
  @observable netId
  @observable injectedWeb3
  @observable isValidator
  @observable isValidKey

  constructor() {
    this.votingKey = '0x0000000000000000000000000000000000000000'
    this.miningKey = '0x0000000000000000000000000000000000000000'
    this.validatorsMetadata = {}
    this.validatorLimits = { keys: null, minThreshold: null, proxy: null }
    this.minBallotDuration = { keys: 0, minThreshold: 0, proxy: 0 }
    this.injectedWeb3 = false
  }

  @computed
  get isEmptyVotingKey() {
    return !this.votingKey || this.votingKey === '0x0000000000000000000000000000000000000000'
  }

  @computed
  get isValidVotingKey() {
    if (this.isEmptyVotingKey) return false
    if (this.isValidKey) return true
    return false
  }

  @action('Set web3Instance')
  setWeb3Instance = web3Config => {
    this.web3Instance = web3Config.web3Instance
    this.netId = web3Config.netId
    this.injectedWeb3 = web3Config.injectedWeb3
    this.networkMatch = web3Config.networkMatch
  }

  @action('Reset contracts')
  resetContracts = () => {
    this.poaConsensus = null
    this.ballotsStorage = null
    this.emissionFunds = null
    this.keysManager = null
    this.proxyStorage = null
    this.votingToChangeKeys = null
    this.votingToChangeMinThreshold = null
    this.votingToChangeProxy = null
    this.votingToManageEmissionFunds = null
    this.validatorMetadata = null
  }

  @action('Set PoA Consensus contract')
  setPoaConsensus = async web3Config => {
    this.poaConsensus = new PoaConsensus()
    await this.poaConsensus.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set Ballots Storage contract')
  setBallotsStorage = async web3Config => {
    this.ballotsStorage = new BallotsStorage()
    await this.ballotsStorage.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set EmissionFunds contract')
  setEmissionFunds = async web3Config => {
    this.emissionFunds = new EmissionFunds()
    await this.emissionFunds.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set KeysManager contract')
  setKeysManager = async web3Config => {
    this.keysManager = new KeysManager()
    await this.keysManager.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set ProxyStorage contract')
  setProxyStorage = async web3Config => {
    this.proxyStorage = new ProxyStorage()
    await this.proxyStorage.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set VotingToChangeKeys contract')
  setVotingToChangeKeys = async web3Config => {
    this.votingToChangeKeys = new VotingToChangeKeys()
    await this.votingToChangeKeys.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set VotingToChangeMinThreshold contract')
  setVotingToChangeMinThreshold = async web3Config => {
    this.votingToChangeMinThreshold = new VotingToChangeMinThreshold()
    await this.votingToChangeMinThreshold.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set VotingToChangeProxy contract')
  setVotingToChangeProxy = async web3Config => {
    this.votingToChangeProxy = new VotingToChangeProxy()
    await this.votingToChangeProxy.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set VotingToManageEmissionFunds contract')
  setVotingToManageEmissionFunds = async web3Config => {
    this.votingToManageEmissionFunds = new VotingToManageEmissionFunds()
    await this.votingToManageEmissionFunds.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Set ValidatorMetadata contract')
  setValidatorMetadata = async web3Config => {
    this.validatorMetadata = new ValidatorMetadata()
    await this.validatorMetadata.init({
      web3: web3Config.web3Instance,
      netId: web3Config.netId
    })
  }

  @action('Get validators length')
  getValidatorsLength = async () => {
    this.validatorsLength = await this.poaConsensus.instance.methods.getCurrentValidatorsLength().call()
  }

  @action('Set voting key')
  setVotingKey = account => {
    this.votingKey = account
  }

  @action('Set mining key')
  setMiningKey = async account => {
    let miningKey = '0x0000000000000000000000000000000000000000'
    if (account && account !== '0x0000000000000000000000000000000000000000') {
      try {
        miningKey = await this.keysManager.instance.methods.miningKeyByVoting(account).call()
      } catch (e) {
        console.log(e)
      }
    }
    this.miningKey = miningKey
  }

  @action('Set isValidator')
  setIsValidator = async votingKey => {
    let isValidator = false

    try {
      isValidator = await this.poaConsensus.isValidator(votingKey)
      console.log(isValidator)
    } catch (e) {
      console.log(e)
    }

    this.isValidator = isValidator
  }

  @action('Set isValidKey')
  setIsValidKey = async votingKey => {
    let isValid = false

    try {
      isValid = await this.votingToChangeProxy.isValidVotingKey(votingKey)
    } catch (e) {
      console.log(e)
    }

    this.isValidKey = isValid
  }

  @action('Update keys')
  updateKeys = async account => {
    account = account || '0x0000000000000000000000000000000000000000'

    if (this.votingKey && this.votingKey.toLowerCase() === account.toLowerCase()) {
      return
    }

    this.setVotingKey(account)
    await this.setIsValidKey(account)

    console.log('votingKey', this.votingKey)

    await this.getBallotsLimits()
  }

  @action('Get all keys ballots')
  getAllBallots = async () => {
    let proxyNextBallotId = 0

    try {
      ;[proxyNextBallotId] = await this.getAllBallotsNextIDs()
      proxyNextBallotId = Number(proxyNextBallotId)
    } catch (e) {
      console.log(e.message)
    }

    const [proxyBallots] = await Promise.all([this.getBallots(proxyNextBallotId, 'votingToChangeProxy')])

    const ballots = [...proxyBallots]
    ballotsStore.ballotCards = this.mapBallotsToCards(ballots)

    const finalizedOrCancelled = item => item.isFinalized || item.isCanceled
    window.localStorage.setItem(
      `ballots-${this.netId}`,
      JSON.stringify({
        votingToChangeProxy: proxyBallots.filter(finalizedOrCancelled)
      })
    )

    const allBallotsIDsLength = proxyNextBallotId

    if (allBallotsIDsLength === 0) {
      commonStore.hideLoading()
    }
  }

  fillCardVotingState = async (votingState, contractType, id) => {
    const voteTotals = await this.getBallotVoteTotals(contractType, id)
    const startEnd = await this.getBallotTimes(votingState)

    votingState.contractTypeDisplayName = ballotStore.ProxyBallotType[votingState.contractType]
    votingState.memo = votingState.description
    votingState.votesFor = voteTotals.votesFor
    votingState.votesAgainst = voteTotals.votesAgainst
    votingState.startTime = startEnd.startTime
    votingState.endTime = startEnd.endTime

    return votingState
  }

  getBallotVoteTotals = async (contractType, id) => {
    let votesFor = 0
    let votesAgainst = 0

    if (contractType === 'votingToChangeProxy') {
      const keys = await this.poaConsensus.getValidators()

      for (let key of keys) {
        const choice = await this.votingToChangeProxy.getVoterChoice(id, key)
        if (choice === '1') {
          votesFor++
        }
        if (choice === '2') {
          votesAgainst++
        }
      }
    }

    return {
      votesFor,
      votesAgainst
    }
  }

  getBallotTimes = async votingState => {
    let startTime = 0
    let endTime = 0
    const { startBlock: startBlockNumber, endBlock: endBlockNumber } = votingState

    const latestBlock = await this.web3Instance.eth.getBlock('latest')
    const startBlock = await this.web3Instance.eth.getBlock(startBlockNumber)
    const endBlock = await this.web3Instance.eth.getBlock(endBlockNumber)

    console.log(
      startBlockNumber,
      latestBlock.number,
      startBlockNumber - latestBlock.number,
      (startBlockNumber - latestBlock.number) * 5,
      latestBlock.timestamp,
      latestBlock.timestamp + (startBlockNumber - latestBlock.number) * 5
    )
    // |latest 34| -------------------- |start 50| 16 * 5

    const startTimeValue = startBlock
      ? startBlock.timestamp
      : latestBlock.timestamp + (startBlockNumber - latestBlock.number) * 5

    const endTimeValue = endBlock
      ? endBlock.timestamp
      : latestBlock.timestamp + (endBlockNumber - latestBlock.number) * 5

    startTime = moment.unix(startTimeValue)
    endTime = moment.unix(endTimeValue)

    console.log(startTime)

    return {
      startTime,
      endTime
    }
  }

  mapBallotsToCards = ballots => {
    return ballots.map((ballot, pos) => {
      let component
      let params = {
        id: ballot.id,
        key: ballot.type + ballot.id,
        pos,
        votingState: ballot
      }
      switch (ballot.type) {
        case 'votingToChangeKeys':
          component = <BallotKeysCard {...params} type={ballotStore.BallotType.keys} />
          break
        case 'votingToChangeMinThreshold':
          component = <BallotMinThresholdCard {...params} type={ballotStore.BallotType.minThreshold} />
          break
        case 'votingToChangeProxy':
          component = <BallotProxyCard {...params} type={ballotStore.BallotType.proxy} />
          break
        case 'votingToManageEmissionFunds':
          component = <BallotEmissionFundsCard {...params} type={ballotStore.BallotType.emissionFunds} />
          break
        default:
          break
      }
      return component
    })
  }

  getBallot = async (id, contractType) => {
    let votingState
    try {
      votingState = await this[contractType].getBallotInfo(id, this.votingKey)
      votingState = await this.fillCardVotingState(votingState, contractType, id)
      votingState.id = id
      votingState.type = contractType
    } catch (e) {
      console.log(e.message)
    }
    return votingState
  }

  getBallots = async (nextBallotId, contractType) => {
    const ballotsObject = JSON.parse(window.localStorage.getItem(`ballots-${this.netId}`) || '{}')
    const existingBallots = ballotsObject[contractType] || []
    const existingBallotsIds = existingBallots.map(item => item.id)
    const allBallotsIds = Array(nextBallotId)
      .fill(undefined)
      .map((item, index) => index)
    const newBallotsIds = allBallotsIds.filter(item => !existingBallotsIds.includes(item))
    const promises = newBallotsIds.map(id => this.getBallot(id, contractType))
    const newBallots = await Promise.all(promises)
    return existingBallots.concat(newBallots)
  }

  @action('Get all keys next ballot ids')
  getAllBallotsNextIDs = async () => {
    const proxyNextBallotId = this.votingToChangeProxy.nextBallotId()
    return Promise.all([proxyNextBallotId])
  }

  @action
  async getBallotsLimits() {
    return new Promise(async resolve => {
      if (this.web3Instance && this.netId) {
        let proxyLimit = 0

        if (this.isValidVotingKey) {
          const limitPerValidator = await this.votingToChangeProxy.getBalletLimitPerValidator()
          proxyLimit = limitPerValidator
        }

        this.validatorLimits.proxy = proxyLimit
      }
      resolve()
    })
  }

  @action
  async getMinBallotDurationsAndThresholds() {
    return new Promise(async resolve => {
      if (this.web3Instance && this.netId) {
        const getProxyMinBallotDuration = this.votingToChangeProxy.minBallotDuration()
        const getProxyThreshold = this.votingToChangeProxy.maxLimitOfBallots()

        await Promise.all([getProxyMinBallotDuration, getProxyThreshold]).then(
          ([proxyMinBallotDuration, proxyBallotThreshold]) => {
            this.minBallotDuration.proxy = proxyMinBallotDuration
            this.proxyBallotThreshold = proxyBallotThreshold
            resolve()
          }
        )
      } else {
        resolve()
      }
    })
  }

  @action
  async getAllValidatorMetadata() {
    const keys = await this.poaConsensus.getValidators()
    this.validatorsLength = keys.length

    keys.forEach(async key => {
      this.validatorsMetadata[key.toLowerCase()] = {
        label: `${key} Last`.trim(),
        lastNameAndKey: `Last ${key}`.trim(),
        fullName: `First Last`.trim(),
        value: key
      }
    })
  }
}

const contractsStore = new ContractsStore()

export default contractsStore
export { ContractsStore }
