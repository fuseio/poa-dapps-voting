import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { inject, observer } from 'mobx-react'

@inject('ballotStore')
@observer
export class BallotProxyMetadata extends React.Component {
  render() {
    const { ballotStore, networkBranch } = this.props
    let options = [
      /*1*/ { value: '1', label: ballotStore.ProxyBallotType[1] }, // Consensus
      /*2*/ { value: '2', label: ballotStore.ProxyBallotType[2] }, // BlockReward
      /*3*/ { value: '3', label: ballotStore.ProxyBallotType[3] }, // ProxyStorage
      /*4*/ { value: '4', label: ballotStore.ProxyBallotType[4] } // Voting
    ]

    return (
      <div className="frm-BallotProxyMetadata">
        <div className="frm-BallotProxyMetadata_Row">
          <FormInput
            hint="Proposed address of a new proxy contract."
            id="key"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'proposedAddress', 'ballotProxy')}
            title="Proposed Address"
            value={ballotStore.ballotProxy.proposedAddress}
          />
          <FormSelect
            hint="Choose proxy contract type."
            id="contract-type"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'contractType', 'ballotProxy')}
            options={options}
            title="Contract Type"
            value={ballotStore.ballotProxy.contractType}
          />
        </div>
        <div className="frm-BallotProxyMetadata_Row">
          <FormInput
            hint="Ballot's start after number of cycles."
            id="datetime-local"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'endTime')}
            title="Ballot Start"
            type="datetime-local"
            value={ballotStore.cycleStart}
          />
          <FormInput
            hint="Ballot's cycle duration."
            id="datetime-local"
            networkBranch={networkBranch}
            onChange={e => ballotStore.changeBallotMetadata(e, 'endTime')}
            title="Ballot End"
            type="datetime-local"
            value={ballotStore.cycleEnd}
          />
        </div>
      </div>
    )
  }
}
