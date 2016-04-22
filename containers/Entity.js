import React from 'react'
import { connect } from 'react-redux'
import { addReferenceDefinition } from '../actions'
import EntityName from './EntityName'
import ReferenceDefinitionList from '../components/ReferenceDefinitionList'


let Entity = ({ entityId, entity, dispatch }) => (
  <div>
    <EntityName entityId={entityId} entityName={entity.entityName}/>
    <ReferenceDefinitionList referenceDefinitions={entity.referenceDefinitions}/>
    <button className="btn btn-default"
      onClick={() => dispatch(addReferenceDefinition(entityId))}>Add Ref
    </button>
  </div>
)

Entity = connect()(Entity)

export default Entity