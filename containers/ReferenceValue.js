import React from 'react'
import { connect } from 'react-redux'
import { changeReferenceValue } from '../actions'

let ReferenceValue = ({ entityId, refId, referenceValue, dispatch }) => (
  <div>
    <input type="text" 
      placeholder="reference value"
      value={referenceValue}
      onChange={e => dispatch(changeReferenceValue(entityId, refId, e.target.value))}/>
  </div>
)

ReferenceValue = connect()(ReferenceValue)

export default ReferenceValue