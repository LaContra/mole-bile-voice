import React, { PropTypes } from 'react'

const EntityName = ({ entityId, name, onEntityNameChange }) => (
  <div className="element-section">
    <input type="text" 
      className="form-control"
      placeholder="entity name"
      value={name}
      onChange={e => onEntityNameChange(entityId, e.target.value)}/>
  </div>
)

EntityName.propTypes = {
  entityId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onEntityNameChange: PropTypes.func.isRequired
}

export default EntityName