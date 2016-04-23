import React, { PropTypes } from 'react'
import ReferenceValue from './ReferenceValue'
import SynonymList from './SynonymList'

const ReferenceEntry = ({ entityId, refId, referenceValue, synonyms, onReferenceValueChange, onSynonymsChange }) => (
  <div>
    <ReferenceValue referenceValue={referenceValue}
      entityId={entityId}
      refId={refId}
      onReferenceValueChange={onReferenceValueChange} />
    <SynonymList synonyms={synonyms}
      entityId={entityId}
      refId={refId}
      onSynonymsChange={onSynonymsChange}/>
  </div>
)

ReferenceEntry.propTypes = {
  entityId: PropTypes.number.isRequired,
  refId: PropTypes.number.isRequired,
  referenceValue: PropTypes.string.isRequired,
  synonyms: PropTypes.arrayOf(PropTypes.string).isRequired,
  onReferenceValueChange: PropTypes.func.isRequired,
  onSynonymsChange: PropTypes.func.isRequired
}

export default ReferenceEntry