import React from 'react'

const SynonymList = ({ synonyms, hidden }) => (
  <div>
    <div>{synonyms}</div>
    <input hidden={hidden} type="text" placeholder="synonym list"/>
  </div>
)

export default SynonymList