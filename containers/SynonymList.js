import React from 'react'
import { connect } from 'react-redux'
import { changeSynonyms } from '../actions'

let SynonymList = ({ entityId, refId, synonyms, dispatch }) => (
  <div>
    <input 
      type="text" 
      placeholder="synonym list"
      value={synonyms}
      onChange={e => dispatch(changeSynonyms(entityId, refId, e.target.value))}/>
  </div>
)

SynonymList = connect()(SynonymList)

export default SynonymList