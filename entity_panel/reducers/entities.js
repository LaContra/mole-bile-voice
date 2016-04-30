import LocalStorage from '../../utils/LocalStorage'

const changeEntityName = (entities, entityId, name) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {name: name});
    }
    return entity
  })
}

const addReferenceEntry = (entities, entityId, ref) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {entries: [...entity.entries, ref]}) 
    }
    return entity
  })
}

const changeReferenceValue = (entities, entityId, refId, refValue) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {entries: entity.entries.map((ref, ref_index) => {
        if (ref_index == refId) {
          return Object.assign({}, ref, {value: refValue})
        }
        return ref
      })})
    }
    return entity
  })
}

const changeSynonyms = (entities, entityId, refId, synonyms) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {entries: entity.entries.map((ref, ref_index) => {
        if (ref_index == refId) {
          return Object.assign({}, ref, {synonyms: synonyms.split(";")})
        }
        return ref
      })})
    }
    return entity
  })
}

const entities = (state = [], action) => {
  switch(action.type) {
    case "ADD_ENTITY":
      return [...state, {
        name: '', 
        entries: [{
          value: '',
          synonyms: []
        }]
      }]
    case "RESTORE_ENTITY":
      return [...state, action.entity]
    case "CHANGE_ENTITY_NAME":
      return changeEntityName(state, action.entityId, action.name)
    case "CLEAN_AND_SAVE_LOCAL_ENTITIES":
      LocalStorage.saveEntities(action.entities)
      return action.entities
    case "ADD_REFERENCE_ENTRY":
      return addReferenceEntry(state, action.entityId, {
        value: '',
        synonyms: []
      })
    case "CHANGE_REFERENCE_VALUE":
      return changeReferenceValue(state, action.entityId, action.refId, action.refValue)
    case "CHANGE_SYNONYMS":
      return changeSynonyms(state, action.entityId, action.refId, action.synonyms)
    default:
      return state
  }
}

export default entities