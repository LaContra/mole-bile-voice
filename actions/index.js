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

export const chnageResponseField = (value) => {
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
