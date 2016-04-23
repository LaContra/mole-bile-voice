import React from 'react'
import { connect } from 'react-redux'
import { addReferenceEntry } from '../actions'
import EntityName from './EntityName'
import ReferenceEntryList from './ReferenceEntryList'


let Entity = ({ entityId, entity, dispatch }) => (
  <div>
    <EntityName entityId={entityId} name={entity.name}/>
    <ReferenceEntryList entityId={entityId} entries={entity.entries}/>
    <button className="btn btn-default"
      onClick={() => dispatch(addReferenceEntry(entityId))}>Add Ref
    </button>
  </div>
)

Entity = connect()(Entity)

export default Entity