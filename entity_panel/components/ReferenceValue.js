import React, { PropTypes } from 'react'

const ReferenceValue = ({ entityId, refId, referenceValue, onReferenceValueChange }) => (
  <div>
    <input type="text" 
      placeholder="reference value"
      value={referenceValue}
      onChange={e => onReferenceValueChange(entityId, refId, e.target.value)}/>
  </div>
)

ReferenceValue.propTypes = {
  entityId: PropTypes.number.isRequired,
  refId: PropTypes.number.isRequired,
  referenceValue: PropTypes.string.isRequired,
  onReferenceValueChange: PropTypes.func.isRequired
}

export default ReferenceValue