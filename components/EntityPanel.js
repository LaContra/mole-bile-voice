import React from 'react'
import EntityControl from '../containers/EntityControl'
import EntityList from './EntityList'

const EntityPanel = () => (
  <div className="right_panel">
    <EntityControl />
    <EntityList />
  </div>
)

export default EntityPanel