import React from 'react'
import { connect } from 'react-redux'
import { changeEntityName, addReferenceEntry, changeReferenceValue, changeSynonyms } from '../../common/actions'
import EntityControl from './EntityControl'
import EntityList from '../components/EntityList'

let EntityPanel = ({ entities, onEntityNameChange, onAddReferenceEntryClick, onReferenceValueChange, onSynonymsChange }) => (
  <div className="right_panel">
    <EntityList entities={entities}
      onEntityNameChange={onEntityNameChange}
      onAddReferenceEntryClick={onAddReferenceEntryClick}
      onReferenceValueChange={onReferenceValueChange}
      onSynonymsChange={onSynonymsChange}/>
    <EntityControl />
  </div>
)

const mapStateToProps = (state) => {
  return {
    entities: state.entities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEntityNameChange: (entityId, entityName) => {
      dispatch(changeEntityName(entityId, entityName))
    },
    onAddReferenceEntryClick: (entityId) => {
      dispatch(addReferenceEntry(entityId))
    },
    onReferenceValueChange: (entityId, refId, refValue) => {
      dispatch(changeReferenceValue(entityId, refId, refValue))
    },
    onSynonymsChange: (entityId, refId, synonyms) => {
      dispatch(changeSynonyms(entityId, refId, synonyms))
    }
  }
}

EntityPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityPanel)

export default EntityPanel