import React, { PropTypes } from 'react'
import ReferenceEntry from './ReferenceEntry'

const ReferenceEntryList = ({ entityId, entries, onReferenceValueChange, onSynonymsChange }) => (
  <div>
    {entries.map((entry, index) => 
      <ReferenceEntry key={index}
        entityId={entityId}
        refId={index}
        referenceValue={entry.value} 
        synonyms={entry.synonyms}
        onReferenceValueChange={onReferenceValueChange}
        onSynonymsChange={onSynonymsChange}/>
    )}
  </div>
)

ReferenceEntryList.propTypes = {
  entityId: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    synonyms: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired).isRequired,
  onReferenceValueChange: PropTypes.func.isRequired,
  onSynonymsChange: PropTypes.func.isRequired
}


export default ReferenceEntryList