import React from 'react'

export const NewBallotMenuInfo = ({ minThreshold, validatorsLength, keys, validatorLimitsMinThreshold, proxy }) => {
  return (
    <div className="mn-NewBallotMenuInfo">
      <h2 className="mn-NewBallotMenuInfo_Title">Limits of the ballot</h2>
      <ul className="mn-NewBallotMenuInfo_List">
        <li className="mn-NewBallotMenuInfo_ListItem">You can create {Number(proxy)} ballot(s) for proxy</li>
      </ul>
    </div>
  )
}
