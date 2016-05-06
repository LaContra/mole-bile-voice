import React, { PropTypes } from 'react'
import Entity from './Entity'

const EntityList = ({ entities, onEntityNameChange, onAddReferenceEntryClick, onReferenceValueChange, onSynonymsChange }) => (
  <div className="panel-section">
    <h4>Add Entity</h4>
    {entities.map((entity, index) => 
      <Entity key={index}
        entityId={index}
        entity={entity}
        onEntityNameChange={onEntityNameChange}
        onAddReferenceEntryClick={onAddReferenceEntryClick}
        onReferenceValueChange={onReferenceValueChange}
        onSynonymsChange={onSynonymsChange} />
    )}
  </div>
)

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      synonyms: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired, 
  onEntityNameChange: PropTypes.func.isRequired,
  onAddReferenceEntryClick: PropTypes.func.isRequired,
  onReferenceValueChange: PropTypes.func.isRequired,
  onSynonymsChange: PropTypes.func.isRequired
}

export default EntityList