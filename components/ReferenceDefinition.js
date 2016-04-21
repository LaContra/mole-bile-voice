import React from 'react'
import ReferenceValue from '../containers/ReferenceValue'
import SynonymList from '../containers/SynonymList'

const ReferenceDefinition = ({ value }) => (
  <div>
    <ReferenceValue value={value}/>
    <SynonymList />
  </div>
)

export default ReferenceDefinition