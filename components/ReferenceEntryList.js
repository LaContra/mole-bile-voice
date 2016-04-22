import React from 'react'
import ReferenceEntry from './ReferenceEntry'

const ReferenceEntryList = ({ entityId, entries }) => (
  <div>
    {entries.map((entry, index) => 
      <ReferenceEntry key={index}
        entityId={entityId}
        refId={index}
        referenceValue={entry.value} 
        synonyms={entry.synonyms}/>
    )}
  </div>
)

export default ReferenceEntryList