import LocalStorage from '../utils/LocalStorage'
import SessionStorage from '../utils/SessionStorage'
import { buildIntentsDataFromCyElements, removeEdgesAndAssignNewIds } from '../cy_canvas/helper'

let intentId = parseInt(LocalStorage.getElements("elementId")) || 0;

const clearnIntentsAction = () => {
  return {
    type: "CLEAR_INTENTS"
  }
}

export const clearIntents = () => {
  return (dispatch, getState) => {
    const state = getState()
    const intents = buildIntentsDataFromCyElements(state.cyElements)   

    intents.forEach(intent => {
      if (intent.id != '') {
        fetch('https://api.api.ai/v1/intents/' + intent.id + '?v=20160510', {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + LocalStorage.getDevKey()
          }),
          body: JSON.stringify(intent)
        }).then((res) => {console.log(res)});
      }
    })

    dispatch(clearnIntentsAction())
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
    // Contexnt name format: edgeId+fromUserSaysId_fromResponseId+toUserSaysId_toResponseId
    const potentialContextIds = contexts[i].split('+')
    const contextSourceId = parseInt(potentialContextIds[1].split('_')[1]) // responseId of intent1
    const contextTargetId = parseInt(potentialContextIds[2].split('_')[0]) // userSaysId of intent2

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
//   "id": "3b314018-92b8-425d-85ca-cf83776620e3",
//   "name": "753:270,180_755_754:270,230",
//   "auto": false,
//   "contexts": [
//     "756+747_748+753_754"
//   ],
//   "templates": [
//     "us"
//   ],
//   "userSays": [
//     {
//       "data": [
//         {
//           "text": "us"
//         }
//       ],
//       "isTemplate": true,
//       "count": 0,
//       "created": -1
//     }
//   ],
//   "responses": [
//     {
//       "resetContexts": false,
//       "action": "aa",
//       "affectedContexts": [
//         {
//           "name": "757+753_754+750_751",
//           "parameters": {}
//         }
//       ],
//       "parameters": [],
//       "speech": "rr"
//     }
//   ],
//   "state": "LOADED",
//   "priority": 500000,
//   "webhookUsed": false
// }

  // Intent name: userSaysId:posX,posY_edgeId_responseId:posX,posY
  const potentialIds = intent.name.split('_')
  const cyElementIds = potentialIds.map(item => parseInt(item.split(':')[0]))
  const cyNodePostions = [potentialIds[0], potentialIds[2]].map(item => item.split(':')[1].split(',').map(n => parseInt(n)))
  const response = intent.responses[0] 
  const speech = (response.speech instanceof Array) ? response.speech.join('\n'): response.speech


  let cyIntentElements = [
    // Intent
    {
      group: "nodes",
      intentId: intent.id,
      data: { user_says: intent.templates.join('\n'), id: cyElementIds[0] },
      classes: "user_says",
      position: {x: cyNodePostions[0][0], y: cyNodePostions[0][1]},
    },
    {
      group: "nodes",
      data: { response: speech, id: cyElementIds[2], action: response.action },
      classes: "response",
      position: {x: cyNodePostions[1][0], y: cyNodePostions[1][1]},
    },
    {
      group: "edges",
      data: {source: cyElementIds[0], target: cyElementIds[2], id: cyElementIds[1]},
      classes: "us2r",
    }
  ]

  // Context
  const incomingContexts = intent.contexts
  const outgoingContexts = intent.responses[0].affectedContexts.map(item => item.name)
  cyIntentElements = cyIntentElements.concat(createContextEdges(incomingContexts), createContextEdges(outgoingContexts))

  return cyIntentElements

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

const sendCreateIntentRequest = (intent) => {
  const intentId = intent.id
  const requestType = intentId == '' ? 'POST' : 'PUT'
  const extraPath = intentId == '' ? '' : '/' + intentId

  return (dispatch) => {
    if (requestType == 'POST') {
      SessionStorage.increaseCreateIntentsNumber()
    }

    return fetch('https://api.api.ai/v1/intents' + extraPath + '?v=20160416', {
      method: requestType,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LocalStorage.getDevKey()
      }),
      body: JSON.stringify(intent)
    }).then((res) => {
      console.log(res)
      const currentNumber = SessionStorage.decreaseCreateIntentsNumber()
      if (currentNumber == 0) {
        dispatch(clearnIntentsAction())
        dispatch(fetchIntents())
      }
    });
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

export const copy = (elements) => {
  return {
    type: "COPY",
    elements
  }
}

const paste = (elements) => {
  return {
    type: "PASTE",
    elements
  }
}

export const parseAndPaste = () => {
  return (dispatch) => {
    const nodesInfo = removeEdgesAndAssignNewIds(SessionStorage.getCopiedNodes(), intentId)
    intentId = nodesInfo.newId
    dispatch(paste(nodesInfo.nodes))
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