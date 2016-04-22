import LocalStorage from '../utils/LocalStorage'

const changeEntityName = (entities, entityId, entityName) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {entityName: entityName});
    }
    return entity
  })
}

const addReferenceDefinition = (entities, entityId, ref) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {referenceDefinitions: [...entity.referenceDefinitions, ref]}) 
    }
    return entity
  })
}

const changeReferenceValue = (entities, entityId, refId, refValue) => {
  return entities.map((entity, index) => {
    if (index == entityId) {
      return Object.assign({}, entity, {referenceDefinitions: entity.referenceDefinitions.map((ref, ref_index) => {
        if (ref_index == refId) {
          return Object.assign({}, ref, {referenceValue: refValue})
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
      return Object.assign({}, entity, {referenceDefinitions: entity.referenceDefinitions.map((ref, ref_index) => {
        if (ref_index == refId) {
          return Object.assign({}, ref, {synonyms: synonyms})
        }
        return ref
      })})
    }
    return entity
  })
}

const removeEmptyValues = (entities) => {
  return entities.map(entity => {
    return Object.assign({}, entity, {referenceDefinitions: entity.referenceDefinitions.filter(ref => {
      return ref.referenceValue != "" && ref.synonyms != ""
    })})
  }).filter(entity => {
    return entity.entityName != "" && entity.referenceDefinitions != null && entity.referenceDefinitions.length > 0
  })
}

const entities = (state, action) => {
  if (typeof state === 'undefined') {
    const entities = LocalStorage.getElements("entities");
    return entities == null? []: entities
  }

  switch(action.type) {
    case "ADD_ENTITY":
      return [...state, {
        entityName: '', 
        referenceDefinitions: [{
          referenceValue: '',
          synonyms: ''
        }]
      }]
    case "CHANGE_ENTITY_NAME":
      return changeEntityName(state, action.entityId, action.entityName)
    case "SAVE_ENTITIES":
      const newEntities = removeEmptyValues(state)
      LocalStorage.saveEntities(newEntities)
      return newEntities
    case "ADD_REFERENCE_DEFINITION":
      return addReferenceDefinition(state, action.entityId, {
        referenceValue: '',
        synonyms: ''
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