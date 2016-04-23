import React from 'react'
import ReferenceValue from './ReferenceValue'
import SynonymList from './SynonymList'

const ReferenceEntry = ({ entityId, refId, referenceValue, synonyms }) => (
  <div>
    <ReferenceValue referenceValue={referenceValue}
      entityId={entityId}
      refId={refId}/>
    <SynonymList synonyms={synonyms}
      entityId={entityId}
      refId={refId}/>
  </div>
)

export default ReferenceEntry