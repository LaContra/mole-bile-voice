import React from 'react'
import ReferenceDefinition from './ReferenceDefinition'

const ReferenceDefinitionList = ({ entityId, referenceDefinitions }) => (
  <div>
    {referenceDefinitions.map((referenceDefinition, index) => 
      <ReferenceDefinition key={index}
        entityId={entityId}
        refId={index}
        referenceValue={referenceDefinition.referenceValue} 
        synonyms={referenceDefinition.synonyms}/>
    )}
  </div>
)

export default ReferenceDefinitionList