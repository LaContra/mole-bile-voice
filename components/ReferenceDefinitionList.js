import React from 'react'
import ReferenceDefinition from './ReferenceDefinition'

const ReferenceDefinitionList = ({ referenceDefinitions }) => (
  <div>
    {referenceDefinitions.map((referenceDefinition, index) => 
      <ReferenceDefinition key={index}
        value={referenceDefinition.value} 
        synonyms={referenceDefinition.synonyms}/>
    )}
  </div>
)

export default ReferenceDefinitionList