import LocalStorage from '../utils/LocalStorage'
import { buildIntentsDataFromCyElements } from '../cy_canvas/helper'

let intentId = parseInt(LocalStorage.getElements("elementId"));

export const clearIntents = () => {
  return {
    type: "CLEAR_INTENTS"
  }
}

export const addIntent = () => {
  return {
    type: "ADD_INTENT",
    id: (intentId+=3)-3
  }
}

export const addUserSays = () => {
  return {
    type: "ADD_USER_SAYS",
    id: intentId++
  }
}

export const addEdge = (source, target, edgeType) => {
  return {
    type: "ADD_EDGE",
    source,
    target,
    id: intentId++,
    edgeType
  }
}

export const saveUserSaysProperties = (nodeId, userSays) => {
  return {
    type: "SAVE_USER_SAYS_PROPERTIES",
    nodeId,
    userSays
  }
}

export const saveResponseProperties = (nodeId, response, action) => {
  return {
    type: "SAVE_RESPONSE_PROPERTIES",
    nodeId,
    response,
    action
  }
}

export const changeUserSaysField = (value) => {
  return {
    type: "CHANGE_USER_SAYS_FIELD",
    value
  }
}

export const changeActionField = (value) => {
  return {
    type: "CHANGE_ACTION_FIELD",
    value
  }
}

export const changeResponseField = (value) => {
  return {
    type: "CHANGE_RESPONSE_FIELD",
    value
  }
}

export const showHideIntentProperties = (targetNode, nodeType) => {
  return {
    type: "SHOW_HIDE_INTENT_PROPERTY",
    targetNode,
    nodeType
  }
}

export const selectElements = (elements) => {
  return {
    type: "SELECT_ELEMENTS",
    elements,
  }
}

export const deleteElements = (elements) => {
  return {
    type: "DELETE_ELEMENTS",
    elements,
  }
}

const TYPE_INTENTS = 'intents'
const TYPE_ENTITIES = 'entities'

// Async action: thunk action
const fetchAgentInfo = (type, objId, callback) => {
  return (dispatch) => {
    return fetch('https://api.api.ai/v1/' + type + '/' + objId + '?v=20160416', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer key'
      })
    }).then(res => res.json())
    .then((json) => {
      console.log(json);
      if (typeof callback != "undefined") {
        switch(type){
          case TYPE_ENTITIES:
            const newObj = {name: json.name, entries: json.entries}
            dispatch(callback(newObj))
          default:
            break
        }
      }
    });
  }
}

// Async action: thunk action
const fetchAgentInfos = (type, callback) => {
  return (dispatch) => {
    return fetch('https://api.api.ai/v1/' + type + '?v=20160422', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer key'
      })
    }).then(res => res.json())
    .then(json => json.forEach(obj => dispatch(fetchAgentInfo(type, obj.id, callback))));
  }
}

const restoreEntity = (entity) => {
  return {
    type: "RESTORE_ENTITY",
    entity
  }
}

export const fetchIntents = () => {
  return fetchAgentInfos(TYPE_INTENTS)
}

export const fetchEntities = () => {
  return fetchAgentInfos(TYPE_ENTITIES, restoreEntity)
}

const sendCreateIntentRequest = (intents) => {
  return (dispatch) => {
    return fetch('https://api.api.ai/v1/intents?v=20160416', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer key'
      }),
      body: JSON.stringify(intents)
    }).then((res) => {console.log(res)});
  }
}

// Async action: thunk action
export const submitIntents = () => {
  return (dispatch, getState) => {
    const state = getState()
    const intents = buildIntentsDataFromCyElements(state.cyElements)   
    intents.forEach(intent => dispatch(sendCreateIntentRequest(intent)))
  }
}

// Entity
export const addEntity = () => {
  return {
    type: "ADD_ENTITY"
  }
}

export const changeEntityName = (entityId, name) => {
  return {
    type: "CHANGE_ENTITY_NAME",
    entityId,
    name
  }
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

// Only called in this action for now
const cleanAndSaveLocalEntities = (entities) => {
  return {
    type: "CLEAN_AND_SAVE_LOCAL_ENTITIES",
    entities
  }
}

// Async action: thunk action
export const submitEntities = () => {
  return (dispatch, getState) => {
    const state = getState()
    const entities = removeEmptyValues(state.entities)

    // Update entities state
    dispatch(cleanAndSaveLocalEntities(entities))

    // Send create entities request
    return fetch('https://api.api.ai/v1/entities?v=20160422', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer key'
      }),
      body: JSON.stringify(entities)
    }).then((res) => {console.log(res)});
  }
}


export const addReferenceEntry = (entityId) => {
  return {
    type: "ADD_REFERENCE_ENTRY",
    entityId
  }
}

export const changeReferenceValue = (entityId, refId, refValue) => {
  return {
    type: "CHANGE_REFERENCE_VALUE",
    entityId,
    refId,
    refValue
  }
}

export const changeSynonyms = (entityId, refId, synonyms) => {
  return {
    type: "CHANGE_SYNONYMS",
    entityId,
    refId,
    synonyms
  }
}
