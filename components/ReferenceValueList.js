import React from 'react'
import ReferenceDefinition from './ReferenceDefinition'

const ReferenceVdalueList = ({ referenceValue }) => (
  <div>
    <ReferenceDefinition value='r1' synonym="s1, s2"/>
    <ReferenceDefinition value='r2' synonym="s1, s2"/>
    <ReferenceDefinition value='r3' synonym="s1, s2"/>
  </div>
)

export default ReferenceVdalueList