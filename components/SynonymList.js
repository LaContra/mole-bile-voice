import React, { PropTypes } from 'react'

const SynonymList = ({ entityId, refId, synonyms, onSynonymsChange }) => (
  <div>
    <input 
      type="text" 
      placeholder="synonym list"
      value={synonyms.join(";")}
      onChange={e => onSynonymsChange(entityId, refId, e.target.value)}/>
  </div>
)

SynonymList.propTypes = {
  entityId: PropTypes.number.isRequired,
  refId: PropTypes.number.isRequired,
  synonyms: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSynonymsChange: PropTypes.func.isRequired
}

export default SynonymList