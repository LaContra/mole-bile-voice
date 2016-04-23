import $ from 'jquery'
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

const removeEmptyValues = (entities) => {
  return entities.map(entity => {
    return Object.assign({}, entity, {entries: entity.entries.filter(ref => {
      return ref.value != "" && ref.synonyms != null && ref.synonyms.length > 0
    })})
  }).filter(entity => {
    return entity.name != "" && entity.entries != null && entity.entries.length > 0
  })
}

const sendCreateEntitiesRequest = (entities) => {
  $.ajax({
      url: "https://api.api.ai/v1/entities?v=20160422",
      beforeSend: function (request) {
          request.setRequestHeader("Authorization", "Bearer key");
      },
      type: "POST",
      data: JSON.stringify(entities),
      contentType: "application/json",
      complete: function(e) { console.log(e)}
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
        name: '', 
        entries: [{
          value: '',
          synonyms: []
        }]
      }]
    case "CHANGE_ENTITY_NAME":
      return changeEntityName(state, action.entityId, action.name)
    case "SAVE_ENTITIES":
      const newEntities = removeEmptyValues(state)
      LocalStorage.saveEntities(newEntities)
      sendCreateEntitiesRequest(newEntities)
      return newEntities
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