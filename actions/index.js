import LocalStorage from '../utils/LocalStorage'

let intentId = LocalStorage.getElements("elementId");

export const clearIntents = () => {
  return {
    type: "CLEAR_INTENTS"
  }
}

export const addIntent = () => {
  return {
    type: "ADD_INTENT",
    id: intentId++
  }
}

export const addEdge = (source, target) => {
  return {
    type: "ADD_EDGE",
    source,
    target
  }
}

export const saveIntentProperties = (nodeId, userSays, response) => {
  return {
    type: "SAVE_INTENT_PROPERTIES",
    nodeId,
    userSays, 
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

// TODO
export const updateIntentLabel = (event) => {
  return {
    type: "UPDATE_INTENT_LABEL"
  }
}

export const showHideIntentProperty = (targetNode) => {
  return {
    type: "SHOW_HIDE_INTENT_PROPERTY",
    targetNode
  }
}

// TODO
export const sendCreateIntentRequest = () => {
  return {
    type: "SEND_CREATE_INTENT_REQUEST"
  }
}
