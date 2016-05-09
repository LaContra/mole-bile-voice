import LocalStorage from '../utils/LocalStorage'
import SessionStorage from '../utils/SessionStorage'
import { buildIntentsDataFromCyElements } from '../cy_canvas/helper'

let intentId = parseInt(LocalStorage.getElements("elementId")) || 0;

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

const addIntentWithData = (intent) => {
  return {
    type: "ADD_INTENT_WITH_DATA",
    intent
  }
}

export const addUserSays = () => {
  return {
    type: "ADD_USER_SAYS",
    id: intentId++
  }
}

export const addResponse = () => {
  return {
    type: "ADD_RESPONSE",
    id: intentId++
  }
}

export const addConversationComponent = (cType) => {
  return {
    type: "ADD_CONVERSATION_COMPONENT",
    id: (intentId+=10)-10,
    cType: cType,
  }
}

export const addEdge = (source, target) => {
  return {
    type: "ADD_EDGE",
    source,
    target,
    id: intentId++,
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
        'Authorization': 'Bearer ' + LocalStorage.getDevKey()
      })
    }).then(res => res.json())
    .then((json) => {
      console.log(json);
      if (typeof callback != "undefined") {
        switch(type){
          case TYPE_INTENTS:
            dispatch(callback(json))
            break;
          case TYPE_ENTITIES:
            const newObj = {name: json.name, entries: json.entries}
            dispatch(callback(newObj))
            break;
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
        'Authorization': 'Bearer ' + LocalStorage.getDevKey()
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

const createContextEdges = (contexts, contextType) => {
  const edges = []
  for (let i = 0 ; i < contexts.length ; i++) {
    // Contexnt name example: "9_1:u1+3:e+2:r1_6:u3+8:e+7:r2" => contextEdgeId_intent1_intent2
    const potentialContextIds = contextType == 'incoming' ? contexts[i].split('_') : contexts[i].name.split('_')
    const contextSourceId = parseInt(potentialContextIds[1].split('+')[2].split(':')[0]) // responseId of intent1
    const contextTargetId = parseInt(potentialContextIds[2].split('+')[0].split(':')[0]) // userSaysId of intent2

    // Insert context edges
    edges.push({
      group: "edges",
      data: {
        source: contextSourceId,
        target: contextTargetId,
        id: parseInt(potentialContextIds[0])},
      classes: "r2us",
    })
  }

  return edges
}

const buildCyIntent = (intent) => {
// {  
//    "id":"d8a056c9-829f-4852-a68e-26e52c08b2dc",
//    "name":"40: u2+r1",
//    "auto":false,
//    "contexts":[  

//    ],
//    "templates":[  
//       "u22",
//       "u2"
//    ],
//    "userSays":[  
//       {  
//          "data":[  
//             {  
//                "text":"u2"
//             }
//          ],
//          "isTemplate":true,
//          "count":0,
//          "created":-1
//       },
//       {  
//          "data":[  
//             {  
//                "text":"u22"
//             }
//          ],
//          "isTemplate":false,
//          "count":0,
//          "created":-1
//       }
//    ],
//    "responses":[  
//       {  
//          "resetContexts":false,
//          "action":"a1",
//          "affectedContexts":[  
//             {  
//                "name":"40:u2+r1_36:u3+r2",
//                "parameters":{  

//                }
//             },
//             {  
//                "name":"40:u2+r1_42:u4+r2",
//                "parameters":{  

//                }
//             }
//          ],
//          "parameters":[  

//          ],
//          "speech":[  
//             "r1",
//             "r11"
//          ]
//       }
//    ],
//    "state":"LOADED",
//    "priority":500000,
//    "webhookUsed":false
// }

  // Intent name: 1:u1+3:e+2:r1 => userSaysId:text + edgeId:e + responseId:text
  const potentialIds = intent.name.split('+')
  const cyNodeIds = potentialIds.map(item => parseInt(item.split(':')[0]))
  const response = intent.responses[0] 
  const speech = (response.speech instanceof Array) ? response.speech.join('\n'): response.speech

  let cyIntentNodes = [
    // Intent
    {
      group: "nodes",
      data: { user_says: intent.templates.join('\n'), id: cyNodeIds[0] },
      classes: "user_says",
      position: {x: 100, y: 100},
    },
    {
      group: "nodes",
      data: { response: speech, id: cyNodeIds[2], action: response.action },
      classes: "response",
      position: {x: 140, y: 100},
    },
    {
      group: "edges",
      data: {source: cyNodeIds[0], target: cyNodeIds[2], id: cyNodeIds[1]},
      classes: "us2r",
    }
  ]

  // Context
  const incomingContexts = intent.contexts
  const outgoingContexts = intent.responses[0].affectedContexts
  cyIntentNodes = cyIntentNodes.concat(createContextEdges(incomingContexts, "incoming"), createContextEdges(outgoingContexts, "outgoing"))

  return cyIntentNodes

  // {
  //   group: "nodes",
  //   data: { user_says: "", id: action.id },
  //   classes: "user_says",
  //   position: {x: 100, y: 100},
  // },
  // {
  //   group: "nodes",
  //   data: { response: "", id: action.id+1, action: "" },
  //   classes: "response",
  //   position: {x: 140, y: 100},
  // },
  // {
  //   group: "edges",
  //   data: {source: action.id, target: action.id+1, id: action.id+2},
  //   classes: "us2r",
  // }
}

const restoreIntent = (intent) => {
  return (dispatch) => {
    // Format transformation: from api.ai to cy
    const cyIntent = buildCyIntent(intent)
    console.log("cyIntent")
    console.log(cyIntent)
    dispatch(addIntentWithData(cyIntent))
  }
}

export const fetchIntents = () => {
  return fetchAgentInfos(TYPE_INTENTS, restoreIntent)
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
        'Authorization': 'Bearer ' + LocalStorage.getDevKey()
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
        'Authorization': 'Bearer ' + LocalStorage.getDevKey()
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

// API Keys
export const changeDevKey = (key) => {
  return {
    type: "CHANGE_DEV_KEY",
    key
  }
}

export const changeClientKey = (key) => {
  return {
    type: "CHANGE_CLIENT_KEY",
    key
  }
}

export const saveKeys = () => {
  return {
    type: "SAVE_KEYS"
  }
}

export const undo = () => {
  return {
    type: "UNDO"
  }
}

export const redo = () => {
  const action = SessionStorage.lastAction()
  const redoSupportTypes = {
    'ADD_INTENT': addIntent, 
    'ADD_USER_SAYS': addUserSays, 
    'ADD_RESPONSE': addResponse, 
    'ADD_CONVERSATION_COMPONENT': addConversationComponent
  }

  return (dispatch) => {
    const nextAction = redoSupportTypes[action.type]
    switch (action.type) {
      case 'ADD_INTENT':
      case 'ADD_USER_SAYS':
      case 'ADD_RESPONSE':
        dispatch(nextAction())
        break;
      case 'ADD_CONVERSATION_COMPONENT':
        dispatch(nextAction(action.cType))
        break;
      default:
        break;
    }
  }
}