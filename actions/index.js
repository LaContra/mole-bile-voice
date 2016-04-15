export const clearIntents = () => {
  return {
    type: "CLEAR_INTENTS"
  }
}

export const addIntent = () => {
  return {
    type: "ADD_INTENT"
  }
}

export const updateIntentLabel = (event) => {
  return {
    type: "UPDATE_INTENT_LABEL"
  }
}

export const saveIntentProperties = () => {
  return {
    type: "SAVE_INTENT_PROPERTIES"
  }
}

export const sendCreateIntentRequest = () => {
  return {
    type: "SEND_CREATE_INTENT_REQUEST"
  }
}
