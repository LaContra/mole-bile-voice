import React from 'react'

const ReferenceValue = ({ value, hidden }) => (
  <div>
    <div>{value}</div>
    <input hidden={hidden} type="text" placeholder="reference value"/>
  </div>
)

export default ReferenceValue