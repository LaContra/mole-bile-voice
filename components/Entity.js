import React from 'react'
import EntityName from '../containers/EntityName'
import ReferenceValueList from './ReferenceValueList'

const Entity = ({ value }) => (
  <div>
    <EntityName value={value}/>
    <ReferenceValueList />
  </div>
)

export default Entity