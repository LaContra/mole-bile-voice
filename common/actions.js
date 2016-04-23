import LocalStorage from '../utils/LocalStorage'

let intentId = parseInt(LocalStorage.getElements("elementId"));

export const clearIntents = () => {
  return {
    type: "CLEAR_INTENTS"
  }
}

export const addIntent = () => {
  return {
    type: "ADD_INTENT",
    id: intentId+=3
  }
}

export const addEdge = (source, target) => {
  return {
    type: "ADD_EDGE",
    source,
    target,
    id: intentId++
  }
}

export const saveUserSaysProperties = (nodeId, userSays) => {
  return {
    type: "SAVE_USER_SAYS_PROPERTIES",
    nodeId,
    userSays
  }
}

export const saveResponseProperties = (nodeId, response) => {
  return {
    type: "SAVE_RESPONSE_PROPERTIES",
    nodeId,
    response
  }
}

export const changeUserSaysField = (value) => {
  return {
    type: "CHANGE_USER_SAYS_FIELD",
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

export const sendCreateIntentRequest = () => {
  return {
    type: "SEND_CREATE_INTENT_REQUEST"
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

export const saveEntities = () => {
  return {
    type: "SAVE_ENTITIES"
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
