import React, { PropTypes } from 'react'
import EntityName from './EntityName'
import ReferenceEntryList from './ReferenceEntryList'

const Entity = ({ entityId, entity, onEntityNameChange, onAddReferenceEntryClick, onReferenceValueChange, onSynonymsChange }) => (
  <div>
    <EntityName entityId={entityId} 
      name={entity.name}
      onEntityNameChange={onEntityNameChange} />
    <ReferenceEntryList entityId={entityId} 
      entries={entity.entries}
      onReferenceValueChange={onReferenceValueChange}
      onSynonymsChange={onSynonymsChange}/>
    <button className="btn btn-default"
      onClick={() => onAddReferenceEntryClick(entityId)}>Add Ref
    </button>
  </div>
)

Entity.propTypes = {
  entityId: PropTypes.number.isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      synonyms: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired).isRequired
  }).isRequired,
  onEntityNameChange: PropTypes.func.isRequired,
  onAddReferenceEntryClick: PropTypes.func.isRequired,
  onReferenceValueChange: PropTypes.func.isRequired,
  onSynonymsChange: PropTypes.func.isRequired
}

export default Entity