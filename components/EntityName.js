import React from 'react'
import { connect } from 'react-redux'
import { changeEntityName } from '../actions'

let EntityName = ({ entityId, name, dispatch }) => (
  <div>
    <input type="text" 
      placeholder="entity name"
      value={name}
      onChange={e => dispatch(changeEntityName(entityId, e.target.value))}/>
  </div>
)

EntityName = connect()(EntityName)

export default EntityName